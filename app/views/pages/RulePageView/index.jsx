import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';

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
            </PageView>
        )
    }
});
