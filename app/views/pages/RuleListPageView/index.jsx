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
    getInitialState() {
        return {
            search: ''
        };
    },
    componentDidMount() {
        React.findDOMNode(this.refs.search).focus();
    },
    onSearchChange() {
        this.setState({
            search: new RegExp(React.findDOMNode(this.refs.search).value, 'i')
        });
        this.render();
    },
    render() {
        return (
            <PageView>
                <TitleView>Rules</TitleView>
                <input 
                    type="text"
                    className="search-bar"
                    ref="search"
                    placeholder="Filter: e.g, 'MultipleSpaces'..."
                    onChange={this.onSearchChange}/>
                <ul className="rule-list">
                    {dataStore.getData().getRules()
                        .filter((rule) => Boolean(rule.getShortDescription()))
                        .filter((rule) => {
                            return rule.getShortDescription().match(this.state.search) ||
                                rule.getName().match(this.state.search);
                        })
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
