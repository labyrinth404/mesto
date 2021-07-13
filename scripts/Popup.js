export class Popup {
    #selector
    constructor(popupSelector) {
        this.#selector = document.querySelector(popupSelector);
    }

    open() {
        this.#setEventListeners();

        this.#selector.classList.add('popup_opened');
        window.addEventListener('keydown', this.#handleEscClose.bind(this));
    }

    close() {
        this.#selector.classList.remove('popup_opened');
        window.removeEventListener('keydown', this.#handleEscClose.bind(this));
    }

    #setEventListeners() {
        this.#handleButtonClose();
        this.#handleBeyondPopupClose();
    }

    #handleButtonClose(){
        this.#selector
        .querySelector('.popup__button-close')
        .addEventListener('click', () => {this.close()});
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
