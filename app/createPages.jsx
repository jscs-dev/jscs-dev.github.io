import fs from 'fs';
import path from 'path';
import renderHtml from './lib/renderHtml';
import React from 'react';
import Router from 'react-router';
import AppView from './views/AppView';
import dataStore from './stores/dataStore';
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
        'index',
        'overview',
        'contributing',
        'rules/',
        'changelog'
    ].concat(data.getRules().map(/** @param {RuleModel} rule */ function(rule) {
        return 'rule/' + rule.getName();
    }));

    pathsToRender.forEach(function(filePath) {

        Router.run(AppView, '/' + (filePath === 'index' ? '' : filePath), function (Handler, state) {
            var html = renderHtml({
                title: 'JSCS',
                content: React.renderToString(<Handler/>),
                dataPath: '/assets/data.js',
                scriptPath: '/assets/bundle.js',
                stylePath: '/assets/bundle.css'
            });

            var filename = outputDir + '/' + filePath + '.html';
            var dirname = path.dirname(filename);
            if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname);
            }

            fs.writeFileSync(filename, html);
            console.log(filename);
        });

    });
});
