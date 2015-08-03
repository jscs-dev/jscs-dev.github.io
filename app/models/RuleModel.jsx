class RuleModel {
    constructor(data) {
        this._name = data.name;
        this._description = data.description;
        this._shortDescription = data.shortDescription;
        this._sourceUrl = data.sourceUrl;
        this._renderTestLink = data.renderTestLink;
        this._testUrl = data.testUrl;
        this._filename = data.filename;
    }

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    getShortDescription() {
        return this._shortDescription;
    }

    getSourceUrl() {
        return this._sourceUrl;
    }

    getRenderTestLink() {
        return this._renderTestLink;
    }

    getTestUrl() {
        return this._testUrl;
    }

    getFilename() {
        return this._filename;
    }

    toJSON() {
        return {
            name: this._name,
            description: this._description,
            shortDescription: this._shortDescription,
            sourceUrl: this._sourceUrl,
            renderTestLink: this._renderTestLink,
            testUrl: this._testUrl,
            filename: this._filename
        };
    }
}

export default RuleModel;
