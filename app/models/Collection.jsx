export default class Collection {
    constructor(items) {
        this._items = items;
    }

    map(callback, context) {
        return this._items.map(callback, context);
    }

    forEach(callback, context) {
        this._items.forEach(callback, context);
    }

    filter(callback, context) {
        return this._items.filter(callback, context);
    }

    toJSON() {
        return this._items;
    }
}
