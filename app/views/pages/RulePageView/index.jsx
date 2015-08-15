import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';

export default React.createClass({
    getInitialState() {
        return {
            ruleName: locationStore.getData()
        };
    },

    componentDidMount() {
        this._locationStoreChangeHandler = () => {
            this.setState(this.getInitialState());
        };
        locationStore.on('change', this._locationStoreChangeHandler);
    },

    componentWillUnmount() {
        locationStore.removeListener('change', this._locationStoreChangeHandler);
    },

    render() {
        /**
         * @type {RuleModel}
         */
        var rule = dataStore.getData().getRules().filter((rule) => {
            return rule.getName() === this.state.ruleName;
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
