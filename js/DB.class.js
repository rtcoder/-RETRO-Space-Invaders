const EMPTY_DB = {
    controls: 'mouseControl',
    level: 0,
    ship: {}
};

export class DB {
    constructor() {
        this._storage = localStorage.getItem('invadersData') || JSON.stringify(EMPTY_DB);
        localStorage.setItem('invadersData', this._storage);
    }

    set storage(value) {
        this._storage = JSON.stringify(value);
        localStorage.setItem('invadersData', this._storage);
    }

    get storage() {
        return JSON.parse(this._storage);
    }

    setValue(key, value) {
        const storage = this.storage;
        if (storage.hasOwnProperty(key)) {
            storage[key] = value;
            this.storage = storage;
        }
    }

    getValue(key) {
        const storage = this.storage;
        return storage.hasOwnProperty(key) ? storage[key] : null;
    }
}

export const Database = new DB();