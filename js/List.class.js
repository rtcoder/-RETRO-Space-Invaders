class List extends Array {
    constructor(...args) {
        super(...args);
    }

    remove(index) {
        this.splice(index, 1);
    }

    add(el) {
        this.push(el)
    }
}