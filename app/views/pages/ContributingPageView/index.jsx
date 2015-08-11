import React from 'react';
import dataStore from '../../../stores/dataStore';
import PageView from '../../PageView';
import './style.styl';
import { State } from 'react-router';
import PageTitle from '../../../mixins/PageTitle';

export default React.createClass({
    mixins: [State, PageTitle],
    render() {
        return (
            <PageView>
                <div className="contributing__links-wrap">
                    See also:
                    <ul className="contributing__links">
                        <li>
                            <a href="/jscs/coverage.html">
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
