import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { PopupWithForm } from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';
import { profilePopup,
    nameInput,
    jobInput,
    addCardPopup,
    popupAddCardContainer,
    profileName,
    profileDescription,
    profileButtonEdit,
    profileButtonAdd,
    elements,
    fullImage,
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




function createCard(cardData) {
    const card = new Card(cardData, '#element');
    return card.generateCard();
}

popupAddCardContainer
initialCards.forEach((cardData) => {
    elements.append(createCard(cardData));
});

profileButtonEdit.addEventListener('click', () => {editProfile.open()});
profileButtonAdd.addEventListener('click', () => {addCard.open()});

validationCardPopup.enableValidation();
validationEditInfo.enableValidation();