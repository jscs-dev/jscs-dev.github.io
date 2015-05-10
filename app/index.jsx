import React from 'react';
import AppView from './views/AppView';
import JscsModel from './models/JscsModel';
import dataStore from './stores/dataStore';

if (typeof window.__jscsData !== 'undefined') {
    dataStore.setData(JscsModel.fromJSON(window.__jscsData));
}

React.render(<AppView />, document.getElementById('root'));
