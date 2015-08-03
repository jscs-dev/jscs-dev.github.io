import React from 'react';
import locationStore from '../../stores/locationStore';

var RouteView = React.createClass({
    getInitialState: function() {
        return {
            page: locationStore.getPage()
        };
    },

    componentDidMount: function() {
        this._pageChangeHandler = (function() {
            if (
                typeof window !== 'undefined' &&
                typeof window.history.state !== 'undefined'
            ) {
                window.scrollTo.apply(window, window.history.state.scroll);
            }
            this.setState({
                page: locationStore.getPage()
            });
        }).bind(this);

        locationStore.on('change', this._pageChangeHandler);
    },

    componentWillUnmount: function() {
        locationStore.removeListener('change', this._pageChangeHandler);
    },

    render: function() {
        var contents = '';

        if (this.state.page === this.props.page) {
            contents = this.props.children;
        }

        return (
            <div className="route-view">
                {contents}
            </div>
        );
    }
});

module.exports = RouteView;
