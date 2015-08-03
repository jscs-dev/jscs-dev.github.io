import React from 'react';
import locationStore from '../../../stores/locationStore';
import navigation from '../../../actions/navigation';

require('./style.styl');

var MenuView = React.createClass({
    render: function() {
        return (
            <menu className={'menu' + '_' + this.props.style}>
                <MenuItemView page="overview" style={this.props.style}>
                    Overview
                </MenuItemView>
                <MenuItemView page="rules" activate={['rules', 'rule']}  style={this.props.style}>
                    Rules
                </MenuItemView>
                <MenuItemView page="contributing" style={this.props.style}>
                    Contributing
                </MenuItemView>
                <MenuItemView page="changelog" style={this.props.style}>
                    Changelog
                </MenuItemView>
            </menu>
        )
    }
});

var MenuItemView = React.createClass({

    _onClick(e) {
        if(e.button === 0 && !e.ctrlKey && !e.metaKey){ // Click without ctrl/cmd or middle button
            e.preventDefault();
            navigation.navigateTo(this.props.page);
        }
    },

    render() {
        var pages = this.props.activate ? this.props.activate : [this.props.page];
        var isActive = pages.indexOf(locationStore.getPage()) !== -1;
        return (
            <li className={'menu_' + this.props.style + '__item ' + (isActive ? ' _active' : '')}
                onClick={this._onClick}>
                <a href={locationStore.renderPath(this.props.page)}>
                    {this.props.children}
                </a>
            </li>
        )
    }
});

module.exports = MenuView;
