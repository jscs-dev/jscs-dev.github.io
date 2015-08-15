import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import navigation from '../../../actions/navigation';
import PageView from '../../PageView';
import TitleView from '../../TitleView';
<<<<<<< HEAD
import { State } from 'react-router';
import PageTitle from '../../../mixins/PageTitle';
import { Navigation } from 'react-router';
=======
>>>>>>> jscs-dev/dev

import './style.styl';

export default React.createClass({
<<<<<<< HEAD
    mixins: [State, PageTitle, Navigation],
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
=======
>>>>>>> jscs-dev/dev
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
