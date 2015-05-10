export default class BadgeModel {
    constructor({title, url, imageUrl}) {
        this._title = title;
        this._url = url;
        this._imageUrl = imageUrl;
    }

    getTitle() {
        return this._title;
    }

    getUrl() {
        return this._url;
    }

    getImageUrl() {
        return this._imageUrl;
    }

    toJSON() {
        return {
            title: this._title,
            url: this._url,
            imageUrl: this._imageUrl
        };
    }
}
