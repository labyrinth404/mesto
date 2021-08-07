export default class Section {
    #items;
    #renderer;
    #container;
    constructor( {items, renderer}, selector) {
        this.#items = items;
        this.#renderer = renderer;
        this.#container = document.querySelector(selector);
    }

    renderItems() {
        this.#items.forEach((item) => {
            this.#renderer(item);
        });
    }

    addItem(element, order = false) {
        if(order) {
            this.#container.append(element);
        } else {
            this.#container.prepend(element)
        }
    }
}