export class Card {
    constructor (cardData, cardSelector) {
        this._text = cardData.name;
        this._image = cardData.link;
        this._cardSelector = cardSelector
    }

    _getTemplate () {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement
    }

    generateCard () {
        this._element = this._getTemplate();
        this._setEventListener();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = `Фото(${this._text})`;
        this._element.querySelector('.element__text').textContent = this._text;

        return this._element
    }

    _setEventListener () {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });

    }

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleTrashClick() {
        this._element.remove();
    }

}

