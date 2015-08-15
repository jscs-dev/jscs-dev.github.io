import {readFileSync} from 'fs';

var template = readFileSync(__dirname + '/html.tpl', 'utf-8');

function renderHtml({title, content, dataPath, scriptPath, stylePath, locationState}) {
    return template
        .replace('{%title%}', title)
        .replace('{%dataPath%}', dataPath)
        .replace('{%scriptPath%}', scriptPath)
        .replace('{%stylePath%}', stylePath)
        .replace('{%locationState%}', locationState)
        .replace('{%content%}', content);
}

module.exports = renderHtml;
