import React from 'react';
import MenuView from '../MenuView';
import SocialButtonsView from '../SocialButtonsView';
import locationStore from '../../../stores/locationStore';
import navigation from '../../../actions/navigation';

import './style.styl';

export default React.createClass({
    _onClick(e) {
        e.preventDefault();
        navigation.navigateTo('index');
    },

    render: function() {
        return (
            <header className="header">
                <div className="header__top">
                    <a href={locationStore.renderPath('index')} onClick={this._onClick}>
                        <div className="header__logo"></div>
                        <div className="header__project">
                            JavaScript Code Style
                        </div>
                    </a>
                    <div className="header__menu">
                        <MenuView style="page" />
                    </div>
                </div>
                <div className="header__bottom">
                    <SocialButtonsView />
                </div>
            </header>
        );
    }
});
