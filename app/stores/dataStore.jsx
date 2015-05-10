class DataStore {
    constructor() {
        this._data = null;
    }

    /**
     * @returns {JscsModel}
     */
    getData() {
        return this._data;
    }

    /**
     * @param {JscsModel} data
     */
    setData(data) {
        this._data = data;
    }
}

export default new DataStore();
