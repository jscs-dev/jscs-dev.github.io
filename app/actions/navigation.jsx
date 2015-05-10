import appDispatcher from '../dispatchers/appDispatcher';

class Navigation {
    navigateTo(page, data) {
        appDispatcher.dispatch({
            action: 'NAVIGATE',
            page,
            data
        });
    }

    navigateToPath(path) {
        appDispatcher.dispatch({
            action: 'NAVIGATE_TO_PATH',
            path
        });
    }
}

export default new Navigation();
