import { initialCards } from '../utils/initial-сards.js';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { Api } from '../components/Api.js'
import { profilePopup,
    addCardPopup,
    profileButtonEdit,
    profileButtonAdd,
    config } from '../utils/constants.js';
    
import './index.css'; 

const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners()

function renderCard(item) {
    const card = new Card({ handleCardClick: () => {
            popupWithImage.open(item);
          }
    },item, '#element');
    
    section.addItem(card.generateCard());
}

const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);

const section = new Section({
    items: initialCards,
    renderer: renderCard
}, '.elements');


const addCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {
    
    renderCard({name: inputValues['mesto-name-form'], link: inputValues['mesto-url-form']});
    
    addCard.close();

    validationCardPopup.toggleButtonSave();
});
addCard.setEventListeners()

const userInfo = new UserInfo({ userName: '.profile__name', 
                                userInfo: '.profile__description'});

const editProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
    
    userInfo.setUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
      
    editProfile.close();
});
editProfile.setEventListeners()

section.renderItems();

profileButtonEdit.addEventListener('click', () => {
    
    const popupElement = document.querySelector('.popup__container_profile');
    const formUserName = popupElement.querySelector('[name="popup-name-form"]');
    const formUserInfo = popupElement.querySelector('[name="popup-description-form"]');
    
    const userInfoData = userInfo.getUserInfo();
    formUserName.value = userInfoData.user;
    formUserInfo.value = userInfoData.info;

    editProfile.open()
    
    
    });

profileButtonAdd.addEventListener('click', () => {addCard.open()});

validationCardPopup.enableValidation();
validationEditInfo.enableValidation();


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: { authorization: '379cd553-b5f6-46c7-ade6-e4556a60f89b' }
  }); 

api.getInitialCards()
//api.getUserInfo()
//api.postCard('Конь 2', 'https://images.unsplash.com/photo-1620384560944-98c833a4761a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80')
//api.deleteCard('6102d96b6b285602e3d3073e')
//api.putLikeCard('6102d72a6b285602e3d3073a')