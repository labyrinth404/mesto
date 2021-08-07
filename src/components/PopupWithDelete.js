import Popup from './Popup.js';

export class PopupWithDelete extends Popup {
    #submit
    #item
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this.#submit = submit;
        
    }

    open(item) {
        super.open()
        this.#item = item;
    }

    setEventListeners() {
    
        super.setEventListeners();
        this.popup
        .querySelector('.popup__form')
        .addEventListener('submit', (evt) => {
          evt.preventDefault()
          this.#submit(this.#item)
        });
    }
}