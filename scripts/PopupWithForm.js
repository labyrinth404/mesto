import Popup from './Popup.js';

export class PopupWithForm extends Popup {

    #submit
    #selector
    constructor(popupSelector, submit) {
        super(popupSelector)
        this.#selector = document.querySelector(popupSelector);
        this.#submit = submit;
    }

    open() {
        super.open();
        this.#setEventListeners();
        this.#getInputValues()
        
        
    }

    close() {
        super.close();
        this.#selector.querySelector('.popup__form').reset();
    }


    #getInputValues() {
        return  this.#selector.querySelectorAll('.popup__input').forEach((element) => [element.value]);
        
    }

    #setEventListeners() {
        this.#selector
        .querySelector('.popup__button-save')
        .addEventListener('click', this.#submit);
    }
}