import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import navigation from '../../../actions/navigation';
import PageView from '../../PageView';
import TitleView from '../../TitleView';

import './style.styl';

export default React.createClass({
    render() {
        return (
            <PageView>
                <TitleView>Rules</TitleView>
                <ul className="rule-list">
                    {dataStore.getData().getRules()
                        .filter((rule) => Boolean(rule.getShortDescription()))
                        .map((rule) => {
                            return <RuleListItem
                                key={rule.getFilename()}
                                rule={rule} />;
                        })}
                </ul>
            </PageView>
        )
    }
});

var RuleListItem = React.createClass({
    _onClick(e) {
        if(e.button === 0 && !e.ctrlKey && !e.metaKey){ // Click without ctrl/cmd or middle button
            e.preventDefault();
            navigation.navigateTo('rule', this.props.rule.getName());
        }
    },

    render() {
        return (
            <li className="rule-list__item">
                <a
                    href={locationStore.renderPath('rule', this.props.rule.getName())}
                    onClick={this._onClick}>
                    {this.props.rule.getName()}
                </a>
                <div className="rule-list__item-description">
                    <div className="markdown"
                         dangerouslySetInnerHTML={{__html: this.props.rule.getShortDescription()}}>
                    </div>
                </div>
            </li>
        );
    }
});
