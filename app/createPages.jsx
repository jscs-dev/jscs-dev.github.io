import fs from 'fs';
import path from 'path';
import renderHtml from './lib/renderHtml';
import React from 'react';
import AppView from './views/AppView';
import dataStore from './stores/dataStore';
import navigation from './actions/navigation';
import locationStore from './stores/locationStore';
import collectData from './lib/collectData';

export default collectData().then(/** @param {JscsModel} data */ function(data) {
    var outputDir = __dirname + '/../result';
    var serializedData = JSON.stringify(data);
    fs.writeFileSync(
        outputDir + '/assets/data.js',
        'window.__jscsData = ' + serializedData
    );

    dataStore.setData(data);

    var pathsToRender = [
        'index.html',
        'overview.html',
        'contributing.html',
        'rules.html',
        'changelog.html'
    ].concat(data.getRules().map(/** @param {RuleModel} rule */ function(rule) {
        return 'rule/' + rule.getName() + '.html';
    }));

    pathsToRender.forEach(function(filePath) {
        navigation.navigateToPath(filePath);

        var html = renderHtml({
            title: locationStore.getTitle(),
            content: React.renderToString(React.createElement(AppView)),
            dataPath: locationStore.renderPath('assets', 'data', '.js'),
            scriptPath: locationStore.renderPath('assets', 'bundle', '.js'),
            stylePath: locationStore.renderPath('assets', 'bundle', '.css'),
            locationState: JSON.stringify({
                page: locationStore.getPage(),
                data: locationStore.getData()
            })
        });

        var filename = outputDir + '/' + filePath;
        var dirname = path.dirname(filename);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }

        fs.writeFileSync(filename, html);

        console.log(filePath);
    });
});
