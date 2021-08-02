import Popup from './Popup.js';

export class PopupWithDelete extends Popup {
    #submit
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this.#submit = submit;
        
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup
        .querySelector('.popup__form')
        .addEventListener('submit', (evt) => {
          evt.preventDefault()
          this.#submit()
        });
    }
}