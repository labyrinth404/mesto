export class Popup {
    #selector
    #popup
    #buttonClose
    constructor(popupSelector) {
        this.#selector = popupSelector;
    }

    open() {
        const popup = document
        .querySelector(this.#selector);

        this.#popup = popup;
        this.#setEventListeners();

        this.#popup.classList.add('popup_opened');
        window.addEventListener('keydown', this.#handleEscClose.bind(this));
    }

    close() {
        this.#popup.classList.remove('popup_opened');
        window.removeEventListener('keydown', this.#handleEscClose.bind(this));
    }

    #setEventListeners() {
        this.#handleButtonClose();
        this.#handleBeyondPopupClose();
    }

    #handleButtonClose(){
        const buttonClose = this.#popup
        .querySelector('.popup__button-close');
        
        this.#buttonClose = buttonClose;

        this.#buttonClose.addEventListener('click', () => {this.close()});
    }

    #handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    #handleBeyondPopupClose() {
        window.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        });
    }
}
