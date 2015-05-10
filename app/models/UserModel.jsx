export default class JscsUser {
    constructor({name, url}) {
        this._name = name;
        this._url = url;
    }

    getName() {
        return this._name;
    }

    getUrl() {
        return this._url;
    }

    toJSON() {
        return {
            name: this._name,
            url: this._url
        };
    }
};
