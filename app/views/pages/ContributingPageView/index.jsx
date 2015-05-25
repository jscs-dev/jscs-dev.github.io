import React from 'react';
import dataStore from '../../../stores/dataStore';
import locationStore from '../../../stores/locationStore';
import PageView from '../../PageView';
import './style.styl'

export default React.createClass({
    render() {
        return (
            <PageView>
                <div className="contributing__links-wrap">
                    See also:
                    <ul className="contributing__links">
                        <li>
                            <a href={locationStore.renderPath('jscs', 'coverage')}>
                                JSCS Test Coverage Report
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="markdown"
                     dangerouslySetInnerHTML={{__html: dataStore.getData().getContributingInfo()}}>
                </div>
            </PageView>
        )
    }
});
