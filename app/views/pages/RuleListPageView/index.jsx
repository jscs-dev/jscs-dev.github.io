import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import navigation from '../../../actions/navigation';
import PageView from '../../PageView';
import TitleView from '../../TitleView';

import './style.styl';

export default React.createClass({
    getInitialState: function() {
        return {
            search: ''
        };
    },
    componentDidMount: function() {
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
