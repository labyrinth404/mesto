import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    #submit
    #inputList
    #formValues
    constructor(popupSelector, submit) {
        super(popupSelector);
        this.#submit = submit;
    }

    close() { 
        super.close(); 
        this.popup.querySelector('.popup__form').reset(); 
    } 

    #getInputValues() {
        const formValues = {}

        this.#inputList = this.popup.querySelectorAll('.popup__input');
        this.#formValues = formValues;

        this.#inputList.forEach((input) => {
            this.#formValues[input.name] = input.value});
        
        return this.#formValues;
        
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup
        .querySelector('.popup__form')
        .addEventListener('submit', () => this.#submit(this.#getInputValues()));
    }
}