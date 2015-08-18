import React from 'react';
import { Route, DefaultRoute, NotFoundRoute, Redirect, RouteHandler, State } from 'react-router';
import IndexPageView from '../pages/IndexPageView';
import RuleListPageView from '../pages/RuleListPageView';
import RulePageView from '../pages/RulePageView';
import ContributingPageView from '../pages/ContributingPageView';
import OverviewPageView from '../pages/OverviewPageView';
import ChangelogPageView from '../pages/ChangelogPageView';

require('./style.styl');

var App = React.createClass({
    render() {
        return (
            <div className='app'>
                <RouteHandler/>
            </div>
        );
    }
});

var NotFound = React.createClass({
    mixins: [State],
    componentWillMount() {
        this.context.router.replaceWith('index');
    },
    render() {
        return (<div/>)
    }
});

var routes = (
    <Route handler={App}>
        <Route name="index" path="/" handler={IndexPageView} />
        <Redirect from="index.html" to="index" />

        <Route name="rules" handler={RuleListPageView} />
        <Redirect from="rules.html" to="rules" />

        <Route name="rule" path="rule/:ruleName" handler={RulePageView} />

        <Route name="overview" handler={OverviewPageView} />
        <Redirect from="overview.html" to="overview" />

        <Route name="contributing" handler={ContributingPageView} />
        <Redirect from="contributing.html" to="contributing" />

        <Route name="changelog" handler={ChangelogPageView} />
        <Redirect from="changelog.html" to="changelog" />

        <NotFoundRoute name="404" handler={NotFound} />
    </Route>
);

export default routes;