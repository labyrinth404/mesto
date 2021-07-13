import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { FormValidator } from './FormValidator.js';
import { profilePopup,
    nameInput,
    popupElement,
    jobInput,
    profilePopupButtonClose,
    addCardPopup,
    addCardPopupButtonClose,
    popupAddCardContainer,
    nameForm,
    urlForm,
    profileName,
    profileDescription,
    profileButtonEdit,
    profileButtonAdd,
    elements,
    fullImageButtonClose,
    fullImage,
    ESC_CODE,
    addCardPopupForm,
    config } from './constants.js';

const zozo = new Popup('.popup_type_add-card');
const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);
zozo.open()
export function handleFullImage(image, title) {      //внутрений голос, говорит что так не нужно, но это работает!!!
   fullImage.querySelector('.popup-image__image').src = image; 
   fullImage.querySelector('.popup-image__image').alt = `Фото (${title})`;
   fullImage.querySelector('.popup-image__title').textContent = title;
    openPopup(fullImage);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup);
}

function openPopup(element) {
    element.classList.add('popup_opened');
    window.addEventListener('keydown', handlerCloseEsc);
}

export function closePopup(element) {
    element.classList.remove('popup_opened');
    window.removeEventListener('keydown', handlerCloseEsc);

}

export function handlerCloseEsc(e) {
    if (e.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function createCard(cardData) {
    const card = new Card(cardData, '#element');
    return card.generateCard();
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    closePopup(addCardPopup);
    const cardData = {
        name: nameForm.value,
        link: urlForm.value
    };

    elements.prepend(createCard(cardData));

    addCardPopupForm.reset()
    validationCardPopup.toggleButtonSave();
    validationEditInfo.toggleButtonSave();
}


initialCards.forEach((cardData) => {
    elements.append(createCard(cardData));
}); 

popupElement.addEventListener('submit', submitProfileForm);
popupAddCardContainer.addEventListener('submit', submitAddCardForm);

profileButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(profilePopup)
});
/*
profileButtonAdd.addEventListener('click', () => { openPopup(addCardPopup) });
profilePopupButtonClose.addEventListener('click', () => { closePopup(profilePopup) });
addCardPopupButtonClose.addEventListener('click', () => { closePopup(addCardPopup) });
fullImageButtonClose.addEventListener('click', () => { closePopup(fullImage) });
*/
/*
window.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
});
*/


validationCardPopup.enableValidation();
validationEditInfo.enableValidation();