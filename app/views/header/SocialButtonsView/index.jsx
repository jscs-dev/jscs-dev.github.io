import React from 'react';
import dataStore from '../../../stores/dataStore';

import './style.styl';

export default React.createClass({
    render() {
        var data = dataStore.getData();

        var mailingListButtonUrl = 'https://groups.google.com/d/forum/' + data.getMailingListName();

        var twitterButtonUrl = 'http://platform.twitter.com/widgets/follow_button.html?screen_name={user}' +
            '&show_count=false&show_screen_name=false';
        twitterButtonUrl = twitterButtonUrl.replace('{user}', data.getTwitterAccount());

        var githubButtonUrl = 'http://ghbtns.com/github-btn.html?user={user}&repo={repo}&type=watch&count=true';
        githubButtonUrl = githubButtonUrl
            .replace('{user}', data.getGithubOrganization())
            .replace('{repo}', data.getGithubProject());

        return (
            <ul className="social-buttons">
                <li className="social-buttons__item">
                    <a href={mailingListButtonUrl} className="social-buttons__mailing-list">
                        Mailing list
                    </a>
                </li>
                <li className="social-buttons__item">
                    <iframe
                        src={twitterButtonUrl}
                        allowTransparency="true"
                        frameBorder="0"
                        width="65"
                        scrolling="no"
                        height="20"></iframe>
                </li>
                <li className="social-buttons__item">
                    <iframe
                        src={githubButtonUrl}
                        allowTransparency="true"
                        frameBorder="0"
                        scrolling="0"
                        width="95"
                        height="20"></iframe>
                </li>
            </ul>
        );
    }
});
