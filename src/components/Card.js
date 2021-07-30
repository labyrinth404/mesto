export class Card {
    #text
    #image
    #likes
    #id
    #cardSelector
    #element
    #handleCardClick
    #owner
    constructor ({ handleCardClick }, cardData, cardSelector) {
        this.#text = cardData.name;
        this.#image = cardData.link;
        this.#likes = cardData.likes;
        this.#id = cardData.id
        this.#owner = cardData.owner._id
        this.#cardSelector = cardSelector
        this.#handleCardClick = handleCardClick;
    }

    #getTemplate() {
        const cardElement = document
        .querySelector(this.#cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        
        return cardElement
    }

    generateCard() {
        this.#element = this.#getTemplate();
        this.#setEventListener();
        this.#element.id = this.#owner

        this.#element.querySelector('.element__image').src = this.#image;
        this.#element.querySelector('.element__image').alt = `Фото(${this.#text})`;
        this.#element.querySelector('.element__text').textContent = this.#text;
        this.#element.querySelector('.element__image').id = this.#id;
        this.#element.querySelector('.element__count').textContent = this.#likes > 0 ? this.#likes : '';
        return this.#element
    }

    #setEventListener() {
        this.#element.querySelector('.element__image').addEventListener('click', () => {
            this.#handleCardClick()});

        this.#element.querySelector('.element__like').addEventListener('click', () => {
            this.#handleLikeClick();
        });
        this.#element.querySelector('.element__trash').addEventListener('click', () => {
            this.#handleTrashClick();
        });

    }

    #handleLikeClick() {
        this.#element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    #handleTrashClick() {
        this.#element.remove();
        this.#element = null;
    }

}

