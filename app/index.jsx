import React from 'react';
import Router from 'react-router';
import dataStore from './stores/dataStore';
import JscsModel from './models/JscsModel';

if (typeof window.__jscsData !== 'undefined') {
    dataStore.setData(JscsModel.fromJSON(window.__jscsData));
}

var AppView = require('./views/AppView');

Router.run(AppView, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('root'));
});