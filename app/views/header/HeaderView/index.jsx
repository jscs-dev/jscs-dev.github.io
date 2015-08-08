import React from 'react';
import { Link } from 'react-router';
import MenuView from '../MenuView';
import SocialButtonsView from '../SocialButtonsView';

import './style.styl';

export default React.createClass({
    render: function() {
        return (
            <header className="header">
                <div className="header__top">
                    <Link to="index">
                        <div className="header__logo" />
                        <div className="header__project">
                            JavaScript Code Style
                        </div>
                    </Link>
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
