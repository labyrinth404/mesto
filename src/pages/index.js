import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { Api } from '../components/Api.js'
import { profilePopup,
    addCardPopup,
    profileButtonEdit,
    profileButtonAdd,
    popupAvatar,
    profileAvatar,
    avatar,
    count,
    formUserName,
    formUserInfo,
    config } from '../utils/constants.js';
    
import './index.css'; 


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: { authorization: '379cd553-b5f6-46c7-ade6-e4556a60f89b' }
  });


let userId = null;




const updateAvatar = new PopupWithForm('.popup_type_avatar', (inputValue) => {
        
    api.patchUserAvatar(inputValue['mesto-url-form'])
    .then(() => {
        userInfo.setUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'], inputValue['mesto-url-form']);
        updateAvatar.close();
    })
    .catch(error => console.log(error));
    
    
    
})
updateAvatar.setEventListeners();


//Информация о пользователе
const userInfo = new UserInfo({ userName: '.profile__name', 
                                userInfo: '.profile__description',
                                userAvatar: '.profile__avatar'});


const editProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
    api.patchUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
        .then(() => {
            userInfo.setUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'], avatarUser.avatar);
        })
        .catch(error => console.log(error))
        .finally(() => {
            editProfile.close();
        });
});
editProfile.setEventListeners()


//Редактировать информацию о пользователе
profileButtonEdit.addEventListener('click', () => {
    
   
    
    const userInfoData = userInfo.getUserInfo();
    formUserName.value = userInfoData.user;
    formUserInfo.value = userInfoData.info;

    editProfile.open()
    
    
    });


//Тут начинается движухка с карточками. 
function renderCard(item) {
    const card = new Card({
        handleCardClick: () => {
            popupWithImage.open(item);
            },
        handleCardLike: () => {
            const likes = item.likes;

            if(likes.find(like => like._id == userId) === undefined){
                api.putLikeCard(item._id)
                .then((res) => {
                    console.log(res)

                });
            } else {
                api.deleteLikeCard(item._id)
                .then((res) => {
                    console.log(res)
                });
            }
            
        },
        handleCardTrash: () => {
            const popupDeleteCard = new PopupWithDelete('.popup_type_confirm', {
                submit: () => { 
                    api.deleteCard(item._id)
                    .then((json) => {
                        json.message == 'Пост удалён' 
                        ? card.deleteTrashClick()
                        : console.log(json.message);
                    });
                    popupDeleteCard.close();
                }});
                popupDeleteCard.open();
                popupDeleteCard.setEventListeners();
            }
        }, {...item, userId}, '#element');
        
    section.addItem(card.generateCard());
};

const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);
const validationEditAvatar = new FormValidator(config, popupAvatar);
const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners()


const section = new Section({items: null,
                             renderer: renderCard
                            }, '.elements')         
  
const addCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {  
        
    api.postCard(inputValues['mesto-name-form'], inputValues['mesto-url-form'])
    .then((result) => {
        section.rendered(renderCard(result));
        addCard.close();
    })
    

    
    validationCardPopup.toggleButtonSave();
});

addCard.setEventListeners()


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userInfo._id;
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    cardsData.forEach(item => section.rendered(renderCard(item)) );
    });


//Слушатели и запуск функций.

validationCardPopup.enableValidation();
validationEditInfo.enableValidation();
validationEditAvatar.enableValidation();


profileButtonAdd.addEventListener('click', () => { addCard.open() });
profileAvatar.addEventListener('click', () => { updateAvatar.open() });