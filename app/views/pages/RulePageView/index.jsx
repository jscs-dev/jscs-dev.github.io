import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';

const baseUrl = 'https://github.com/jscs-dev/node-jscs';
const getRuleUrl = ruleName => `${baseUrl}/blob/master/lib/rules/${ruleName}.js`;
const getTestUrl = ruleName => `${baseUrl}/blob/master/test/specs/rules/${ruleName}.js`;
const setCamelCaseToHyphens = str => str.replace(/([a-z][A-Z])/g, (g) => `${g[0]}-${g[1].toLowerCase()}`);

export default React.createClass({
    render() {
        var ruleName = locationStore.getData();
        /**
         * @type {RuleModel}
         */
        var rule = dataStore.getData().getRules().filter((rule) => {
            return rule.getName() === ruleName;
        })[0];
        return (
            <PageView>
                <div className="rule">
                    <div className="rule-description markdown"
                         dangerouslySetInnerHTML={{__html: rule.getDescription()}}>
                    </div>
                </div>
                <div><a href={getRuleUrl(setCamelCaseToHyphens(rule.getName()))}>Rule source</a></div>
                <div><a href={getTestUrl(setCamelCaseToHyphens(rule.getName()))}>Test source</a></div>
            </PageView>
        )
    }
});
