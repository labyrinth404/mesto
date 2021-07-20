import { PopupWithImage } from './PopupWithImage.js'

export class Card {
    #text
    #image
    #cardSelector
    #element
    constructor (cardData, cardSelector) {
        this.#text = cardData.name;
        this.#image = cardData.link;
        this.#cardSelector = cardSelector
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

        this.#element.querySelector('.element__image').src = this.#image;
        this.#element.querySelector('.element__image').alt = `Фото(${this.#text})`;
        this.#element.querySelector('.element__text').textContent = this.#text;

        return this.#element
    }

    #setEventListener() {
        this.#element.querySelector('.element__image').addEventListener('click', () => {
           const popupWithImage = new PopupWithImage('.popup-image');
           popupWithImage.open(this.#image, this.#text)
        });
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

