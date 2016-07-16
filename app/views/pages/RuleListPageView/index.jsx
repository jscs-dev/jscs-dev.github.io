import React from 'react';
import { Link } from 'react-router';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';
import { State } from 'react-router';
import PageTitle from '../../../mixins/PageTitle';
import { Navigation } from 'react-router';
import fuzzy from 'fuzzy';

import './style.styl';

const fuzzyNameOptions = {
    pre: '<em>',
    post: '</em>',
    extract: function(rule) {
        return rule.getName();
    }
};

const fuzzySummaryOptions = {
    pre: '<em>',
    post: '</em>',
    extract: function(rule) {
        return rule.getShortDescription();
    }
};

export default React.createClass({
    getInitialState() {
        var query = this.props.query.q;

        return {
            query: this.props.query.q
        }
    },
    componentDidMount() {
        React.findDOMNode(this.refs.search).focus();
    },
    onSearchChange() {
        var query = React.findDOMNode(this.refs.search).value;
        this.transitionTo('/rules?q=' + query)
        this.setState({
            query
        });
        this.render();
    },
    mixins: [State, PageTitle, Navigation],
    render() {
        var rules = dataStore.getData().getRules()
            .filter(rule => Boolean(rule.getShortDescription()));
        var nameMatches = [];
        var summaryMatches = [];
        if (this.state.query) {
            nameMatches = fuzzy.filter(this.state.query, rules, fuzzyNameOptions);
            var nameMatchedRules = nameMatches.map(match => match.original);
            var restRules = rules.filter(rule => nameMatchedRules.indexOf(rule) === -1);
            summaryMatches = fuzzy.filter(this.state.query, restRules, fuzzySummaryOptions);
        }

        return (
            <PageView>
                <TitleView>Rules</TitleView>
                <input
                    type="text"
                    className="search-bar"
                    ref="search"
                    placeholder="Filter: e.g, 'MultipleSpaces'..."
                    defaultValue={this.props.query.q}
                    onChange={this.onSearchChange}/>
                <ul className="rule-list">
                    {
                        nameMatches.map((match, key) => {
                            return <RuleListItem
                                key={key}
                                rule={match.original}
                                name={match.string} />;
                        })
                    }
                    {
                        summaryMatches.map((match, key) => {
                            return <RuleListItem
                                key={key}
                                rule={match.original} />;
                        })
                    }
                </ul>
            </PageView>
        )
    }
});

var RuleListItem = React.createClass({

    render() {
        return (
            <li className="rule-list__item">
                <Link to="rule"
                    params={{ruleName: this.props.rule.getName()}}
                    dangerouslySetInnerHTML={{__html: this.props.name || this.props.rule.getName()}}>
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
