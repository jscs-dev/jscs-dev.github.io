import React from 'react';
import MenuView from '../../header/MenuView';
import FooterView from '../../FooterView';
import SocialButtonsView from '../../header/SocialButtonsView';
import dataStore from '../../../stores/dataStore';

import './style.styl';

export default React.createClass({
    render() {
        /** @type JscsModel */
        var data = dataStore.getData();
        var index = data.getIndex();

        /**
         * @param {BadgeModel} badge
         */
        function processBadge(badge) {
            return (
                <li className="index__badge">
                    <a href={badge.getUrl()}>
                        <img src={badge.getImageUrl()} alt={badge.getTitle()} />
                    </a>
                </li>
            );
        }
        return (
            <div className="index">
                <section className="index__intro">
                    <div className="index__logo" />

                    <h1 className="index__title">
                        {index.getTitle()}
                    </h1>

                    <nav className="index__menu">
                        <MenuView style="index" />
                    </nav>

                    <div
                        className="index__info"
                        dangerouslySetInnerHTML={{__html: index.getIntroduction()}}>
                    </div>

                    <ul className="index__badges">
                        {index.getBadges().map(processBadge)}
                    </ul>

                    <ul className="index__social-buttons">
                        <SocialButtonsView />
                    </ul>
                </section>

                <section className="index__content">
                    <div className="index__social">
                        <h2 className="index__users-title">
                            Who uses JSCS?
                        </h2>
                        <ul className="index__users">
                            {index.getUsers().map((user) => (
                                <li className="index__user">
                                    <a href={user.getUrl()} className="index__user-link">
                                        {user.getName()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="index__users-other">
                            and many other awesome projects
                        </div>
                        <h2 className="index__maintainers-title">
                            Who develops JSCS?
                        </h2>
                        <ul className="index__maintainers" id="maintainers">
                            {data.getMaintainers().map(
                                /** @param {MaintainerModel} maintainer */
                                (maintainer) => (
                                    <li className="index__maintainer">
                                        <a href={maintainer.getGithubLink()}>
                                            <img src={maintainer.getGithubImageLink()} className="index__maintainer-image" />
                                        </a>
                                        <div className="index__maintainer-name">
                                            <a href={maintainer.getGithubLink()}>
                                                {maintainer.getName()}
                                            </a>
                                        </div>
                                        <div className="index__maintainer-email">
                                            <a href={'mailto:' + maintainer.getEmail()}>
                                                {maintainer.getEmail()}
                                            </a>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </section>
                <FooterView />
            </div>
        )
    }
});

function stickTerms(input) {
    return input.replace(/(\w) (\w)/g, '$1\u00A0$2'); // using non-breaking space
}
