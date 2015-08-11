var mixin = {
    componentWillMount() {
        var title = this.getTitle();
        if (typeof document !== 'undefined') {
            document.title = title;
        }
        this.context.router._title = title;
    },
    getTitle() {
        var page = this.getRoutes()[1].name;
        if (page === 'index') {
            return 'JSCS: JavaScript Code Style checker';
        } else {
            var title = '';
            if (page === 'rule') {
                title = this.props.params.ruleName + ' rule';
            } else {
                title = page.substr(0, 1).toUpperCase() + page.substr(1);
            }
            return 'JSCS - ' + title;
        }
    }
};

export default mixin;