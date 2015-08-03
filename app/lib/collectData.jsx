import path from 'path';
import vow from 'vow';
import vowFs from 'vow-fs';
import RuleModel from '../models/RuleModel';
import config from './config';
import processMarkdown from './processMarkdown';
import JscsModel from '../models/JscsModel';
import IndexModel from '../models/IndexModel';
import Collection from '../models/Collection';
import MaintainerModel from '../models/MaintainerModel'
import UserModel from '../models/UserModel'
import BadgeModel from '../models/BadgeModel'

const jscsRoot = __dirname + '/../../jscs';

export default () => {
    var packageInfo = require(jscsRoot + '/package.json');
    return vow.all([
        getAvailableRules().then(function(ruleFilenames) {
            return vow.all(ruleFilenames.map(buildRuleInfo));
        }),
        getReadmeData(),
        processMarkdownFile('OVERVIEW.md'),
        processMarkdownFile('CONTRIBUTING.md'),
        processMarkdownFile('CHANGELOG.md', true)
    ]).spread(function(ruleList, index, overview, contributing, changelog) {
        return new JscsModel({
            githubOrganization: config.githubOrganization,
            githubProject: config.githubProject,
            twitterAccount: config.twitterAccount,
            mailingListName: config.mailingListName,
            rules: new Collection(ruleList),
            maintainers: new Collection(packageInfo.maintainers.map((maintainer) => {
                return new MaintainerModel({
                    name: maintainer.name,
                    email: maintainer.email,
                    githubUsername: maintainer['github-username'],
                    role: maintainer.role
                })
            })),
            index: new IndexModel(index),
            overview,
            contributing,
            changelog
        });
    });
};

function buildRuleInfo(rulePath) {
    var RuleClass = require(rulePath);
    var ruleInstance = new RuleClass();
    var optionName = ruleInstance.getOptionName();
    var filename = path.basename(rulePath);
    var projectUrl = 'https://github.com/' + config.githubOrganization + '/' + config.githubProject;
    var blobUrl = projectUrl + '/blob/master';
    var fileUrl = blobUrl + '/lib/rules/' + filename;
    var testFilePath = buildRuleTestFilePath(filename);
    var testUrl = blobUrl + '/test/specs/rules/' + filename;

    return vow.all([vowFs.read(rulePath, 'utf8'), vowFs.exists(testFilePath)]).spread(function(fileContents, hasTestFile) {
        var match = fileContents.match(/^\/\*\*([\s\S]*?)\*\//m);
        var description = '';
        if (match) {
            var doc = match[1];
            doc = doc.split('\n').map(function(line) {
                return line.replace(/^ \*(?: ?)/, '');
            }).join('\n');
            doc = doc.replace(/\*\\\//g, '*/');

            description = doc;
        }

        var lines = description.trim().split('\n');
        var shortDescription = '';
        var line;
        while ((line = lines.shift()).trim() !== '') {
            shortDescription += line + '\n';
        }

        description = processMarkdown('# ' + optionName + '\n\n' + description + '\n\n');
        shortDescription = processMarkdown(shortDescription);

        return new RuleModel({
            name: optionName,
            description: description,
            shortDescription: shortDescription,
            sourceUrl: fileUrl,
            renderTestLink: hasTestFile,
            testUrl: testUrl,
            filename: filename
        });
    });
}

function buildRuleTestFilePath(ruleFilename) {
    return jscsRoot + '/test/specs/rules/' + ruleFilename;
}

function getAvailableRules() {
    var rulesDir = jscsRoot + '/lib/rules';
    return vowFs.listDir(rulesDir).then(function(filenames) {
        return filenames.map(function(filename) {
            return rulesDir + '/' + filename;
        });
    });
}

function getReadmeData() {
    return vowFs.read(jscsRoot + '/README.md', 'utf8').then((readme) => {
        var introEnd = readme.indexOf('####');
        var intro = readme.substr(0, introEnd);
        var info = readme.substr(introEnd);

        var badges = [];
        intro = intro.replace(/\[\!\[([^\]]+)\]\(([^\)]+)\)\]\(([^\)]+)\)/g, function(s, title, imageUrl, url) {
            badges.push(new BadgeModel({title, imageUrl, url}));
            return '';
        }).trim();
        var introBits = intro.split('\n');
        var title = stripHtml(processMarkdown(introBits.shift()));
        var introduction = stripHtml(processMarkdown(introBits.join('\n')));

        var users = [];

        var match;
        var chapterRegexp = /### (.+)\n([\s\S]*?)(?:#|$)/g;
        while (match = chapterRegexp.exec(info)) {
            if (match[1] === 'Who uses JSCS?') {
                var usersText = match[2];
                var userMatch;
                var userRegexp = /\[([^\]]+)\]\(([^\)]+)\)/g;
                while (userMatch = userRegexp.exec(usersText)) {
                    users.push(new UserModel({
                        name: userMatch[1],
                        url: userMatch[2]
                    }));
                }
            }
        }

        return {
            badges: new Collection(badges),
            title,
            introduction,
            users: new Collection(users)
        };
    });
}

function processMarkdownFile(filename, forceToc) {
    return vowFs.read(jscsRoot + '/' + filename, 'utf8').then((content) => {
        return processMarkdown((forceToc ? '<!-- toc -->\n\n' : '') + content);
    });
}

function stripHtml(html) {
    return html.replace(/<([^>]+)>/g, '');
}
