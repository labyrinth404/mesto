export default class Popup {
    #callHandleEscClose
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector); //намеренно сделал публичным так как для приватности используется # который не наследуется, менять в одном месте на _ моветон
        this.#callHandleEscClose = this.#handleEscClos.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');
        window.addEventListener('keydown', this.#callHandleEscClose);
    }

    close() {
        this.popup.classList.remove('popup_opened');
        window.removeEventListener('keydown', this.#callHandleEscClose);
    }

    setEventListeners() {
        this.#handleButtonClose();
        this.#handleBeyondPopupClose();
    }

    #handleButtonClose(){
        this.popup
        .querySelector('.popup__button-close')
        .addEventListener('click', () => {this.close()});
    }

    #handleEscClos(e) {
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
