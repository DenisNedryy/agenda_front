export class Debouncer {
    constructor(delay) {
        this.delay = delay;
        this.timeout = null;
    }

    execute(callback) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => callback(), this.delay);
    }
}

