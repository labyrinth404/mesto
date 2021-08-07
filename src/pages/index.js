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
    formUserName,
    formUserInfo,
    config } from '../utils/constants.js';
    
import './index.css'; 


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: { authorization: '379cd553-b5f6-46c7-ade6-e4556a60f89b' }
  });


let userId = null;
let userInfoData = null;

const userInfo = new UserInfo({ userName: '.profile__name', 
                                userInfo: '.profile__description',
                                userAvatar: '.profile__avatar'});



const updateAvatar = new PopupWithForm('.popup_type_avatar', (inputValue) => {
        
    api.patchUserAvatar(inputValue['mesto-url-form'])
    .then(() => {
        userInfo.setUserInfo(userInfoData.name, userInfoData.about, inputValue['mesto-url-form']);
        updateAvatar.close();
    })
    .catch(error => console.log(error));
    
    
    
})
updateAvatar.setEventListeners();


//Информация о пользователе



const editProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
    api.patchUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
        .then(() => {
            userInfo.setUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'], userInfoData.avatar);
        })
        .catch(error => console.log(error))
        .finally(() => {
            editProfile.close();
        });
});
editProfile.setEventListeners()


//Редактировать информацию о пользователе
profileButtonEdit.addEventListener('click', () => {
    console.log(userInfoData)
    formUserName.value = userInfoData.name;
    formUserInfo.value = userInfoData.about;

    editProfile.open()
    
    
    });
// ЗАГРУЗКА (LOADER)
const renderLoading = (isLoading = true, textButtonDefault = "Сохранение...", form) => {
    const activeButton = document.querySelector(`${form} .popup__button-save`)
    if(isLoading){
            activeButton.textContent = "Сохранение...";
            return;
    }else { activeButton.textContent = textButtonDefault}
}


//Тут начинается движухка с карточками. 
function renderCard(item, order) {
    const card = new Card({
        handleCardClick: () => {
            popupWithImage.open(item);
            },
        handleCardLike: () => {
            api.changeLikeCard(item._id, card.checkLike())
                .then(() => {
                    card.changeLike();
                    console.log(card.checkLike())
                })
                .catch(error => console.log(error))
            },
        handleCardTrash: () => {
            popupDeleteCard.open({...item, card});
            }
        }, {...item, userId}, '#element');
        
    section.addItem(card.generateCard(), order);
};

const validationCardPopup = new FormValidator(config, addCardPopup);
const validationEditInfo =  new FormValidator(config, profilePopup);
const validationEditAvatar = new FormValidator(config, popupAvatar);
const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners()


const popupDeleteCard = new PopupWithDelete('.popup_type_confirm', {
    submit: (item) => { 
        api.deleteCard(item._id)
        .then((json) => {
            json.message == 'Пост удалён' 
            ? item.card.deleteTrashClick()
            : console.log(json.message);
            popupDeleteCard.close();
        })
        .catch(error => console.log(error));
       
    }});
popupDeleteCard.setEventListeners();


const section = new Section({items: null,
                             renderer: renderCard
                            }, '.elements')         
  
const addCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {  
    
    
    api.postCard(inputValues['mesto-name-form'], inputValues['mesto-url-form'])
    .then((result) => {
        renderLoading(true, 'Сохранение...', '.popup_type_add-card')
        validationCardPopup.toggleButtonSave();
        renderCard(result, false);
        addCard.close();

    })
    .catch(error => console.log(error))
    .finally(()=> {
        renderLoading(false, 'Создать', '.popup_type_add-card')
    });
});

addCard.setEventListeners()




Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfoData = userData;
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    cardsData.forEach((item) => { renderCard(item, true) });
    })
    .catch(error => console.log(error));


//Слушатели и запуск функций.

validationCardPopup.enableValidation();
validationEditInfo.enableValidation();
validationEditAvatar.enableValidation();


profileButtonAdd.addEventListener('click', () => { 
    renderLoading(false, 'Создать', '.popup_type_add-card');
    addCard.open() 
});
profileAvatar.addEventListener('click', () => { updateAvatar.open() });