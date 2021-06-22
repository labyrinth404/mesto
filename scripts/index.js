import { Card } from './Card.js'

class CardPopup extends Card {
    constructor(cardData, cardSelector) {
        super(cardData, cardSelector)
    }

    _setEventListener() {
        super._setEventListener();
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleFullImage();
        });
    }

    _handleFullImage() {
        fullImage.querySelector('.popup-image__image').src = this._image; 
        fullImage.querySelector('.popup-image__image').alt = `Фото (${this._text})`;
        fullImage.querySelector('.popup-image__title').textContent = this._text;
        openPopup(fullImage);
    }
}


const profilePopup = document.querySelector('.popup_type_profile'),
    popupElement = document.querySelector('.popup__container_profile'),
    nameInput = popupElement.querySelector('[name="popup-name-form"]'),
    jobInput = popupElement.querySelector('[name="popup-description-form"]'),
    profilePopupButtonClose = document.querySelector('.popup__button-close_profile');

const addCardPopup = document.querySelector('.popup_type_add-card'),
    addCardPopupButtonClose = addCardPopup.querySelector('.popup__button-close_add-card'),
    popupAddCardContainer = addCardPopup.querySelector('.popup__container_add-card'),
    nameForm = addCardPopup.querySelector('[name="mesto-name-form"]'),
    urlForm = addCardPopup.querySelector('[name="mesto-url-form"');

const profileInfo = document.querySelector('.profile'),
    profileName = profileInfo.querySelector('.profile__name'),
    profileDescription = profileInfo.querySelector('.profile__description'),
    profileButtonEdit = profileInfo.querySelector('.profile__button-edit'),
    profileButtonAdd = profileInfo.querySelector('.profile__button-add');

const elements = document.querySelector('.elements'),
    elementTemplate = elements.querySelector('#element').content;

const fullImageButtonClose = document.querySelector('.popup-image__button-close');
const fullImage = document.querySelector('.popup-image');
    

const ESC_CODE = "Escape";

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input_active'
}


const submitProfileForm = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup);
}

const openPopup = (element) => {
    element.classList.add('popup_opened');
    window.addEventListener('keydown', handlerCloseEsc);
}

const closePopup = (element) => {
    element.classList.remove('popup_opened');
    window.removeEventListener('keydown', handlerCloseEsc);

}

const handlerCloseEsc = (e) => {
    if (e.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const submitAddCardForm = (evt) =>{
    evt.preventDefault();
    closePopup(addCardPopup);
    const cardData = {
        name: nameForm.value,
        link: urlForm.value
    };

    elements.prepend(createCard(cardData));
    nameForm.value = '';
    urlForm.value = '';
    const { inputSelector, submitButtonSelector } = config;
        inputList = Array.from(addCardPopup.querySelectorAll(inputSelector)),
        buttonElement = addCardPopup.querySelector(submitButtonSelector);
    
    toggleButtonSave(buttonElement, inputList);

}



initialCards.forEach((item) => {
    const card = new CardPopup(item, '#element');
    const cardElement = card.generateCard();
    elements.append(cardElement);
}); 

popupElement.addEventListener('submit', submitProfileForm);
popupAddCardContainer.addEventListener('submit', submitAddCardForm);

profileButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(profilePopup)
});
profileButtonAdd.addEventListener('click', () => { openPopup(addCardPopup) });

profilePopupButtonClose.addEventListener('click', () => { closePopup(profilePopup) });
addCardPopupButtonClose.addEventListener('click', () => { closePopup(addCardPopup) });
fullImageButtonClose.addEventListener('click', () => { closePopup(fullImage) });

window.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
});

enableValidation(config);
