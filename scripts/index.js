import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
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


const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);

const addCard = new PopupWithForm('.popup_type_add-card', (evt) => {
    evt.preventDefault();
    
    const addCardPopup = document.querySelector('.popup_type_add-card');
    const cardData = {
        name: addCardPopup.querySelector('[name="mesto-name-form"]').value,
        link: addCardPopup.querySelector('[name="mesto-url-form"').value
    };
    addCard.close();
    elements.prepend(createCard(cardData));

    validationCardPopup.toggleButtonSave();
    validationEditInfo.toggleButtonSave();
});

const editProfile = new PopupWithForm('.popup_type_profile', (evt) => {
    evt.preventDefault();
    const popupElement = document.querySelector('.popup__container_profile');

    profileName.textContent = popupElement.querySelector('[name="popup-name-form"]').value;
    profileDescription.textContent = popupElement.querySelector('[name="popup-description-form"]').value;
    
    editProfile.close();
});





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

popupAddCardContainer
initialCards.forEach((cardData) => {
    elements.append(createCard(cardData));
}); 
/*
popupElement.addEventListener('submit', submitProfileForm);
*/
profileButtonEdit.addEventListener('click', () => {editProfile.open()});
profileButtonAdd.addEventListener('click', () => {addCard.open()});
/*

popupAddCardContainer.addEventListener('submit', addCard.open());
profileButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(profilePopup)
});



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