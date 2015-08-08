import React from 'react';
import { Link } from 'react-router';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';
import { State } from 'react-router';
import PageTitle from '../../../mixins/PageTitle';

import './style.styl';

export default React.createClass({
    mixins: [State, PageTitle],
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

    render() {
        return (
            <li className="rule-list__item">
                <Link to="rule" params={{ruleName: this.props.rule.getName()}}>
                    {this.props.rule.getName()}
                </Link>
                <div className="rule-list__item-description">
                    <div className="markdown"
                         dangerouslySetInnerHTML={{__html: this.props.rule.getShortDescription()}}>
                    </div>
                </div>
            </li>
        );
    }
});
