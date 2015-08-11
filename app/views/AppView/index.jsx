import React from 'react';
import IndexPageView from '../pages/IndexPageView';
import RouteView from './RouteView';
import RuleListPageView from '../pages/RuleListPageView';
import RulePageView from '../pages/RulePageView';
import ContributingPageView from '../pages/ContributingPageView';
import OverviewPageView from '../pages/OverviewPageView';
import ChangelogPageView from '../pages/ChangelogPageView';

require('./style.styl');

export default React.createClass({
    render() {
        return (
            <div className="app">
                <RouteView page="index">
                    <IndexPageView />
                </RouteView>
                <RouteView page="rules">
                    <RuleListPageView />
                </RouteView>
                <RouteView page="rule">
                    <RulePageView />
                </RouteView>
                <RouteView page="overview">
                    <OverviewPageView />
                </RouteView>
                <RouteView page="contributing">
                    <ContributingPageView />
                </RouteView>
                <RouteView page="changelog">
                    <ChangelogPageView />
                </RouteView>
            </div>
        );
    }
});
