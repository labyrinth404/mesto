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
    avatar,
    profileAvatar,
    config } from '../utils/constants.js';
    
import './index.css'; 

function renderCard(item) {
    const card = new Card({ handleCardClick: () => {
            popupWithImage.open(item);
            }
    },item, '#element');
    
    this.addItem(card.generateCard());
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: { authorization: '379cd553-b5f6-46c7-ade6-e4556a60f89b' }
  });


const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners()



const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);


api.getInitialCards()
    .then((res) => { 
        console.log(res)
        
     const section = new Section({
        items: res.map(item => ({name: item.name, 
                                 link: item.link, 
                                likes: item.likes.length, 
                                   id: item._id,
                                owner: item.owner })),
        renderer: renderCard
    }, '.elements');
    
    section.renderItems();
})




const addCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {      
    api.postCard(inputValues['mesto-name-form'], inputValues['mesto-url-form'])
    renderCard({name: inputValues['mesto-name-form'], link: inputValues['mesto-url-form']});
    
    this.close();

    validationCardPopup.toggleButtonSave();
});
addCard.setEventListeners()
console.log(avatar)
const updateAvatar = new PopupWithForm('.popup_type_avatar', (inputValues) => {
    inputValues['mesto-url-form']
    inputValues.value = avatar.src
    console.log(avatar.src)
    console.log(inputValue);
    updateAvatar.close();
    
})
updateAvatar.setEventListeners();



const userInfo = new UserInfo({ userName: '.profile__name', 
                                userInfo: '.profile__description'});

api.getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data.name, data.about)
    })

const editProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
    
    api.patchUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
        .then(() => {
            api.getUserInfo()
            .then((data) => {
                userInfo.setUserInfo(data.name, data.about)
            })
            editProfile.close();
        });
});
editProfile.setEventListeners()



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

profileAvatar.addEventListener('click', () => {updateAvatar.open()});

 


//api.getUserInfo()
//api.postCard('Конь 2', 'https://images.unsplash.com/photo-1620384560944-98c833a4761a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80')
//api.deleteCard('6102d96b6b285602e3d3073e')
//api.putLikeCard('6102d72a6b285602e3d3073a')