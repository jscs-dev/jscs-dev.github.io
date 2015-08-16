import React from 'react';
import { Link } from 'react-router';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';
import { State } from 'react-router';
import PageTitle from '../../../mixins/PageTitle';
import { Navigation } from 'react-router';

import './style.styl';

export default React.createClass({
    getInitialState() {
        var search = '';

        if (this.props.params.filter) {
            search = new RegExp(this.props.params.filter, 'i')
        }

        return {
            search: search
        }
    },
    componentDidMount() {
        React.findDOMNode(this.refs.search).focus();
    },
    onSearchChange() {
        var query = React.findDOMNode(this.refs.search).value;
        this.transitionTo('/rules/' + query)
        this.setState({
            search: new RegExp(query, 'i')
        });
        this.render();
    },
    mixins: [State, PageTitle, Navigation],
    render() {
        return (
            <PageView>
                <TitleView>Rules</TitleView>
                <input
                    type="text"
                    className="search-bar"
                    ref="search"
                    placeholder="Filter: e.g, 'MultipleSpaces'..."
                    defaultValue={this.props.params.filter}
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