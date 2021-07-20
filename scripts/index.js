import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js'
import { FormValidator } from './FormValidator.js';
import { profilePopup,
    addCardPopup,
    popupAddCardContainer,
    profileName,
    profileDescription,
    profileButtonEdit,
    profileButtonAdd,
    elements,
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

const userInfo = new UserInfo({ userName: '.profile__name', 
                                infUser: '.profile__description'});


const editProfile = new PopupWithForm('.popup_type_profile', (evt) => {
    evt.preventDefault();

    const popupElement = document.querySelector('.popup__container_profile');
    const formUserName = popupElement.querySelector('[name="popup-name-form"]');
    const formUserInfo = popupElement.querySelector('[name="popup-description-form"]');

    formUserName.textContent = userInfo.getUserInfo().user;
    formUserInfo.textContent = userInfo.getUserInfo().info;

    userInfo.setUserInfo(formUserName.value, formUserInfo.value)
    editProfile.close();
});


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