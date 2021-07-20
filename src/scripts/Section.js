export default class Section {
    #items;
    #rendere;
    #selector;
    constructor( {items, rendere}, selector) {
        this.#items = items;
        this.#rendere = rendere;
        this.#selector = document.querySelector(selector);
    }

    renderer() {
        this.#items.forEach((item) => {
            this.#rendere(item);
        });
    }

    addItem(element) {
        this.#selector.prepend(element);
    }
}