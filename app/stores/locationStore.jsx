import {EventEmitter} from 'events';
import appDispatcher from '../dispatchers/appDispatcher';
import dataStore from './dataStore';

class LocationStore extends EventEmitter {
    constructor() {
        super();

        this._state = {
            page: 'index',
            data: null
        };

        if (typeof window !== 'undefined') {

            this._state = parsePath(window.location.pathname);

            if (window.__locationState) {
                this._state = processRewrites(window.__locationState, getCurrentWindowHash());
            }

            var onUrlChanged = () => {
                let newState = processRewrites(parsePath(String(window.location.pathname)), getCurrentWindowHash());
                this._navigate(newState, false);
            };

            if (typeof window.onpopstate !== 'undefined') {
                window.addEventListener('popstate', onUrlChanged);
            } else if (typeof window.onhashchange !== 'undefined') {
                window.addEventListener('hashchange', onUrlChanged);
            }
        }

        appDispatcher.register(this._onDispatch.bind(this));
    }

    _onDispatch(payload) {
        if (payload.action === 'NAVIGATE') {
            this._navigate(payload, true);
        }

        if (payload.action === 'NAVIGATE_TO_PATH') {
            this._navigate(parsePath(payload.path), true);
        }
    }

    _navigate(newState, pushToHistory) {
        if (this._state.page !== newState.page || this._state.data !== newState.data) {
            var newPath = this.renderPath(
                newState.page, newState.data
            );
            this._state = newState;
            if (typeof document !== 'undefined') {
                document.title = this.getTitle();
            }
            if (pushToHistory &&
                typeof window !== 'undefined' &&
                typeof window.history.pushState !== 'undefined'
            ) {
                try {
                    window.history.replaceState({scroll: [window.scrollX, window.scrollY]}, document.title, window.location.pathname);
                    window.history.pushState({scroll: [0, 0]}, this.getTitle(), newPath);
                } catch (e) {} // Can fail on file:// origins
            }
            this.emit('change');
        }
    }

    getPage() {
        return this._state.page;
    }

    getData() {
        return this._state.data;
    }

    renderPath(page, data, extension) {
        var pathToRoot = this._state.data ? '../' : './';
        if (page === 'index') {
            return pathToRoot;
        } else {
            return pathToRoot + page + (data ? '/' + data : '') + (extension || '.html');
        }
    }

    getTitle() {
        var page = this._state.page;
        if (page === 'index') {
            return 'JSCS: JavaScript Code Style checker';
        } else {
            var title = '';
            if (page === 'rule') {
                title = this._state.data + ' rule';
            } else {
                title = page.substr(0, 1).toUpperCase() + page.substr(1);
            }
            return 'JSCS - ' + title;
        }
    }
}

export default new LocationStore();

function parsePath(path) {
    var hashPos = path.indexOf('#');
    if (hashPos !== -1) {
        path = path.substr(0, hashPos);
    }
    var pathBits = path.replace(/^\/|\.html$/g, '').split('/');
    if (pathBits.length === 1 && pathBits[0] === '') {
        return {
            page: 'index',
            data: null
        };
    } else {
        return {
            page: pathBits.shift(),
            data: pathBits.shift() || null
        };
    }
}

function getCurrentWindowHash() {
    if (typeof window !== 'undefined') {
        var fullHash = window.location.hash;
        if (fullHash && fullHash.charAt(0) === '#') {
            return fullHash.slice(1);
        }
    }
    return '';
}

/**
 * Processing legacy urls.
 * @private
 */
function processRewrites(state, windowHash) {
    if (windowHash) {
        var ruleName = getRuleName(windowHash);
        if ((state.page === 'rule' || state.page === 'rules') && ruleName) {
            return {
                page: 'rule',
                data: ruleName
            };
        }
    }
    return state;
}

let lowerRuleNameIndex;

function getRuleName(input) {
    if (!lowerRuleNameIndex) {
        lowerRuleNameIndex = dataStore.getData().getRules().reduce((obj, rule) => {
            obj[rule.getName().toLowerCase()] = rule.getName();
            return obj;
        }, {})
    }

    return lowerRuleNameIndex[input.toLowerCase()];
}
