import StoreService from "../services/store.services.js"

export default class ListItem extends StoreService {
    constructor(container, initialValue) {
        super(initialValue);

        this.HTMLContainer = container;
    }

    add(human) {
        const { firstName, lastName, id, mark } = human;
        let listItem = this.createItem(firstName, lastName, id, mark);
        this.HTMLContainer.append(listItem);
        this.addToStore(human);
    }

    removeById(id) {
        let child = this.HTMLContainer.querySelector(`[data-id ="${id}"]`);
        this.HTMLContainer.removeChild(child);
        this.removeItem();
    }

    createItem(firstName, lastName, id, mark) {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.dataset.id = id;
        li.textContent = `${firstName} ${lastName} - mark: ${mark}`;
        return li;
    }
}