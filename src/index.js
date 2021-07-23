import { initialCards } from './utils/initial-сards.js';
import { Card } from './scripts/Card.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { PopupWithImage } from './scripts/PopupWithImage.js'
import { UserInfo } from './scripts/UserInfo.js'
import { FormValidator } from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import { profilePopup,
    addCardPopup,
    profileButtonEdit,
    profileButtonAdd,
    config } from './utils/constants.js';
    
import './pages/index.css'; 

const popupWithImage = new PopupWithImage('.popup-image');

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
    document.querySelector('.popup_type_add-card').querySelector('.popup__form').reset();

    validationCardPopup.toggleButtonSave();
});

const userInfo = new UserInfo({ userName: '.profile__name', 
                                userInfo: '.profile__description'});

const editProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
    userInfo.setUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
      
    
    

    editProfile.close();
    
   
});

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