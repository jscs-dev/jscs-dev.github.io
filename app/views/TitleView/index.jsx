import React from 'react';

import './style.styl';

export default React.createClass({
    render() {
        return (
            <h1 className="title">
                {this.props.children}
            </h1>
        );
    }
});
