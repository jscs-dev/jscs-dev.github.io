import React from 'react';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';
import TitleView from '../../TitleView';

export default React.createClass({
    render() {
        return (
            <PageView>
                <TitleView>Changelog</TitleView>
                <div className="markdown"
                     dangerouslySetInnerHTML={{__html: dataStore.getData().getChangelog()}}>
                </div>
            </PageView>
        )
    }
});
