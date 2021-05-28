export default class StoreService {
    constructor(initialValue = []) {
        this.store = initialValue;
    }

    addToStore(item) {
        this.store.push(item);
    }

    removeItem(id) {
        this.store = this.store.filter((item) => item.id != id);
    }
}