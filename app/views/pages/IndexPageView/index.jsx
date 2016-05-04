import React from 'react';
import { State } from 'react-router';
import MenuView from '../../header/MenuView';
import FooterView from '../../FooterView';
import SocialButtonsView from '../../header/SocialButtonsView';
import dataStore from '../../../stores/dataStore';
import PageTitle from '../../../mixins/PageTitle';

import './style.styl';

export default React.createClass({
    mixins: [State, PageTitle],
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
                    <div className="index__eslint" />

                    <h1
                        className="index__title"
                        dangerouslySetInnerHTML={{__html: index.getTitle()}}>
                    </h1>

                    <div
                        className="index__info"
                        dangerouslySetInnerHTML={{__html: index.getIntroduction()}}>
                    </div>

                    <nav className="index__menu">
                        <MenuView style="index" />
                    </nav>

                    <ul className="index__badges">
                        {index.getBadges().map(processBadge)}
                    </ul>

                    <ul className="index__social-buttons">
                        <SocialButtonsView />
                    </ul>
                </section>

                <section className="index__content">
                    <div className="index__social">
                        <h2 className="index__feature-title">
                            JSCS checks your JavaScript
                        </h2>
                        <pre className="index__feature-main">
                            jscs file.js --preset=airbnb
                        </pre>
                        <h3 className="index__feature-sign">
                            JSCS has built-in presets to check your code against.
                            Or you can create your own and share them as npm packages
                        </h3>
                        <div className="index__feature-container">
                            <div className="index__file" />
                            <div className="index__output" />
                        </div>
                    </div>
                    <div className="index__social">
                        <h2 className="index__feature-title">
                            Support for ES2015, JSX, Flow, and more
                        </h2>
                        <h3 className="index__feature-sign">
                            JSCS can lint any valid ES6/7 code
                        </h3>
                        <div className="index__feature-container">
                            <div className="index__esnext" />
                        </div>
                    </div>
                    <div className="index__social">
                        <h2 className="index__feature-title">
                            Automatically fix your errors
                        </h2>
                        <pre className="index__feature-main">
                            jscs src --fix
                        </pre>
                        <div className="index__feature-container">
                            <div className="index__autofixbefore" />
                            <div className="index__autofixafter" />
                        </div>
                    </div>
                    <div className="index__social">
                        <h2 className="index__feature-title">
                            Automatically create your configuration file
                        </h2>
                        <pre className="index__feature-main">
                            jscs --auto-configure src
                        </pre>
                        <h3 className="index__feature-sign">
                            Base your own config off of the closet preset to your own style
                        </h3>
                        <div className="index__feature-container">
                            <div className="index__autoconfigure" />
                        </div>
                    </div>
                    <div className="index__social">
                        <h2 className="index__feature-title">
                            Use JSCS with your favorite tools
                        </h2>
                        <h3 className="index__feature-sign">
                            Support for grunt, gulp, sublime, atom, etc
                        </h3>
                        <div className="index__feature-container">
                            <div className="index__editor" />
                        </div>
                    </div>
                    <div className="index__social">
                        <h2 className="index__maintainers-title">
                            Who developed JSCS?
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
