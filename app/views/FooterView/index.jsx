import React from 'react';

import './style.styl';

export default React.createClass({
    render() {
        var year = (new Date()).getFullYear();
        return (
            <footer className="footer">
                <span className="footer__copyrights">
                    &copy; {year} JSCS
                </span>
                <span className="footer__designer">
                    Design: Tasha Orbita
                </span>
            </footer>
        );
    }
});
