import React from 'react';
import { Link, State } from 'react-router';

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

    mixins: [State],

    render() {
        var pages = this.props.activate ? this.props.activate : [this.props.page];
        var isActive = pages.some((page) => this.isActive(page));
        return (
            <li className={'menu_' + this.props.style + '__item ' + (isActive ? ' _active' : '')}>
                <Link to={this.props.page}>
                    {this.props.children}
                </Link>
            </li>
        )
    }
});

module.exports = MenuView;
