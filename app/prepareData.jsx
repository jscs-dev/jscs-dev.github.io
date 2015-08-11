import fs from 'fs';
import renderHtml from './lib/renderHtml';
import React from 'react';
import dataStore from './stores/dataStore';
import collectData from './lib/collectData';

export default collectData().then(/** @param {JscsModel} data */ function(data) {
    fs.writeFileSync(__dirname + '/../tmp/data.json', JSON.stringify(data));
});
