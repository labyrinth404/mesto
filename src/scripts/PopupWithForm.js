import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    #submit
    #inputList
    #formValues
    constructor(popupSelector, submit) {
        super(popupSelector);
        this.#submit = submit;
    }

    #getInputValues() {
        const inputList = this.popup.querySelectorAll('.popup__input');
        const formValues = {}
        console.log(formValues)
        this.#inputList = inputList;
        this.#formValues = formValues;

        this.#inputList.forEach((input) => {
            this.#formValues[input.name] = input.value});
        
        return this.#formValues;
        
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup
        .querySelector('.popup__button-save')
        .addEventListener('click', () => this.#submit(this.#getInputValues()));
    }


}