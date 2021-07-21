import { initialCards } from './scripts/initial-сards.js';
import { Card } from './scripts/Card.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js'
import { FormValidator } from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import { profilePopup,
    addCardPopup,
    profileButtonEdit,
    profileButtonAdd,
    config } from './scripts/constants.js';
    
import './pages/index.css'; 


const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);

const section = new Section({
    items: initialCards,
    rendere: (item) => {
        const card = new Card(item, '#element');
        section.addItem(card.generateCard());
    }
}, '.elements');

const addCard = new PopupWithForm('.popup_type_add-card', (evt) => {
    evt.preventDefault();
    
    const addCardPopup = document.querySelector('.popup_type_add-card');
    const cardData = [{
        name: addCardPopup.querySelector('[name="mesto-name-form"]').value,
        link: addCardPopup.querySelector('[name="mesto-url-form"').value
    }];
    addCard.close();

    const element = new Section({
        items: cardData,
        rendere: (item) => {
            const card = new Card(item, '#element');
            section.addItem(card.generateCard());
        }
    });
    element.renderer()

    validationCardPopup.toggleButtonSave();
    validationEditInfo.toggleButtonSave();
});

const userInfo = new UserInfo({ userName: '.profile__name', 
                                userInfo: '.profile__description'});


const editProfile = new PopupWithForm('.popup_type_profile', (evt) => {
    evt.preventDefault();

    const popupElement = document.querySelector('.popup__container_profile');
    const formUserName = popupElement.querySelector('[name="popup-name-form"]');
    const formUserInfo = popupElement.querySelector('[name="popup-description-form"]');


    formUserName.textContent = userInfo.getUserInfo().user;
    formUserInfo.textContent = userInfo.getUserInfo().info;

    userInfo.setUserInfo(formUserName.value, formUserInfo.value)
    editProfile.close();
    
    formUserName.value = userInfo.getUserInfo().user;
    formUserInfo.value = userInfo.getUserInfo().info;
});


section.renderer();

profileButtonEdit.addEventListener('click', () => {editProfile.open()});
profileButtonAdd.addEventListener('click', () => {addCard.open()});

validationCardPopup.enableValidation();
validationEditInfo.enableValidation();