export default class Section {
    #items;
    #renderer;
    #container;
    constructor( {items, renderer}, selector) {
        this.#items = items;
        this.#renderer = renderer;
        this.#container = document.querySelector(selector);
    }

    renderItems(data = this.#items, order) {
        data.forEach((item) => {
            this.#renderer(item, order);
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