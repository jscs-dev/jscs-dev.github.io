import React from 'react';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';
import { State } from 'react-router';
import PageTitle from '../../../mixins/PageTitle';

export default React.createClass({
    mixins: [State, PageTitle],
    render() {
        /**
         * @type {RuleModel}
         */
        var rule = dataStore.getData().getRules().filter((rule) => {
            return rule.getName() === this.props.params.ruleName;
        })[0];
        return (
            <PageView>
                <div className="rule">
                    <div className="rule-description markdown"
                         dangerouslySetInnerHTML={{__html: rule.getDescription()}}>
                    </div>
                </div>
                <div><a href={rule.getSourceUrl()}>Rule source</a></div>
                {(() => {
                    if (rule.getRenderTestLink()) {
                        return (
                            <div><a href={rule.getTestUrl()}>Test source</a></div>
                        )
                    }
                })()}
            </PageView>
        )
    }
});
