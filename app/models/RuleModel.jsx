class RuleModel {
    constructor(data) {
        this._name = data.name;
        this._description = data.description;
        this._sourceUrl = data.sourceUrl;
        this._filename = data.filename;
    }

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    getSourceUrl() {
        return this._sourceUrl;
    }

    getFilename() {
        return this._filename;
    }

    toJSON() {
        return {
            name: this._name,
            description: this._description,
            sourceUrl: this._sourceUrl
        };
    }
}

export default RuleModel;
