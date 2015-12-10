import Collection from './Collection';
import RuleModel from './RuleModel';
import BadgeModel from './BadgeModel';
import MaintainerModel from './MaintainerModel';
import IndexModel from './IndexModel';

export default class JscsModel {
    constructor({
        githubOrganization,
        githubProject,
        twitterAccount,
        mailingListName,
        rules,
        index,
        maintainers,
        overview,
        contributing,
        changelog,
        version
    }) {
        this._githubOrganization = githubOrganization;
        this._githubProject = githubProject;
        this._twitterAccount = twitterAccount;
        this._mailingListName = mailingListName;
        this._rules = rules || new Collection();
        this._index = index;
        this._maintainers = maintainers || new Collection();
        this._overview = overview;
        this._contributing = contributing;
        this._changelog = changelog;
        this._version = version;
    }

    getIndex() {
        return this._index;
    }

    getGithubOrganization() {
        return this._githubOrganization;
    }

    getGithubProject() {
        return this._githubProject;
    }

    getTwitterAccount() {
        return this._twitterAccount;
    }

    getMailingListName() {
        return this._mailingListName;
    }

    getRules() {
        return this._rules;
    }

    getMaintainers() {
        return this._maintainers;
    }

    getContributingInfo() {
        return this._contributing;
    }

    getOverview() {
        return this._overview;
    }

    getChangelog() {
        return this._changelog;
    }

    getVersion() {
        return this._version;
    }

    toJSON() {
        return {
            githubOrganization: this._githubOrganization,
            githubProject: this._githubProject,
            twitterAccount: this._twitterAccount,
            mailingListName: this._mailingListName,
            rules: this._rules,
            index: this._index,
            maintainers: this._maintainers,
            overview: this._overview,
            contributing: this._contributing,
            changelog: this._changelog,
            version: this._version
        };
    }
};

JscsModel.fromJSON = function(data) {
    return new JscsModel({
        githubOrganization: data.githubOrganization,
        githubProject: data.githubProject,
        twitterAccount: data.twitterAccount,
        mailingListName: data.mailingListName,
        rules: data.rules && new Collection(data.rules.map(function(ruleData) {
            return new RuleModel(ruleData);
        })),
        index: IndexModel.fromJSON(data.index),
        maintainers: data.maintainers && new Collection(data.maintainers.map(function(maintainerData) {
            return new MaintainerModel(maintainerData);
        })),
        overview: data.overview,
        contributing: data.contributing,
        changelog: data.changelog,
        version: data.version
    });
};
