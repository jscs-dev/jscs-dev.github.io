import React from 'react';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';

export default React.createClass({
    render() {
        return (
            <PageView>
                <div className="markdown"
                     dangerouslySetInnerHTML={{__html: dataStore.getData().getContributingInfo()}}>
                </div>
            </PageView>
        )
    }
});
