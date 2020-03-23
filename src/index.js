class Mutex {
    constructor() {
        this._queue = {};
        this._pending = {};
    }

    checkKey(key) {
        if (!key) throw new Error("Key required");
    }

    isLocked(key) {
        this.checkKey(key);
        return this._pending[key];
    }

    buildTicket(key) {
        return new Promise(resolve => this._queue[key].push(resolve));
    }

    acquire(key) {
        this.checkKey(key);
        this.preCheckKey(key);
        let ticket = this.buildTicket(key);

        if (!this.isLocked(key)) {
            this._dispatchNext(key);
        }

        return ticket;
    }

    preCheckKey(key) {
        this.checkKey(key);
        if (!this._queue[key]) {
            this._queue[key] = [];
            this._pending[key] = false;
        }
    }

    _dispatchNext(key) {
        this.checkKey(key);
        this.preCheckKey(key);
        if (this._queue[key].length > 0) {
            this._pending[key] = true;
            this._queue[key].shift()(this._dispatchNext.bind(this));
        } else {
            this._pending[key] = false;
        }
    }
}

module.exports = Mutex;
