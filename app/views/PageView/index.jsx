import React from 'react';
import HeaderView from '../header/HeaderView';
import FooterView from '../FooterView';

import './style.styl';

export default React.createClass({
    render() {
        return (
            <div className="page">
                <HeaderView />
                <div className="page__content">
                    {this.props.children}
                </div>
                <FooterView />
            </div>
        );
    }
});
