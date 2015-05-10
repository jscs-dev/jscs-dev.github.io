import {EventEmitter} from 'events';
import appDispatcher from '../dispatchers/appDispatcher';

class LocationStore extends EventEmitter {
    constructor() {
        super();

        this._state = {
            page: 'index',
            data: null
        };

        if (typeof window !== 'undefined'){
            if (window.__locationState) {
                this._state = window.__locationState;
            }

            if (typeof window.onpopstate !== 'undefined') {
                window.addEventListener('popstate', () => {
                    var newState = parsePath(String(window.location.pathname));
                    this._navigate(newState, false);
                })
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
            this._state = newState;
            if (typeof document !== 'undefined') {
                document.title = this.getTitle();
            }
            if (pushToHistory &&
                typeof window !== 'undefined' &&
                typeof window.history.pushState !== 'undefined'
            ) {
                try {
                    window.history.pushState(null, this.getTitle(), this.renderPath(
                        newState.page, newState.data
                    ));
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
