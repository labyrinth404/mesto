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


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: { authorization: '379cd553-b5f6-46c7-ade6-e4556a60f89b' }
  });


api.getUserInfo()
  .then((data) => {

    //Верхняя часть странички связанная с пользователем.  Уже начал теряться в своем же коде, по этому решил коментить.

    //Аватарка

    const updateAvatar = new PopupWithForm('.popup_type_avatar', (inputValue) => {
        api.patchUserAvatar(inputValue['mesto-url-form'])
            .then(() => {
                console.log(inputValue['mesto-url-form'])
            })
            .catch(error => console.log(error))
            .finally(() =>{
                updateAvatar.close();
            });
        
    })
    updateAvatar.setEventListeners();


    //Информация о пользователе
    const userInfo = new UserInfo({ userName: '.profile__name', 
                                    userInfo: '.profile__description'});

    userInfo.setUserInfo(data.name, data.about)

    const editProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
        api.patchUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
            .then(() => {
                userInfo.setUserInfo(inputValues['popup-name-form'], inputValues['popup-description-form'])
            })
            .catch(error => console.log(error))
            .finally(() => {
                editProfile.close();
            });
    });
    editProfile.setEventListeners()


    //Редактировать информацию о пользователе
    profileButtonEdit.addEventListener('click', () => {
        
        const popupElement = document.querySelector('.popup__container_profile');
        const formUserName = popupElement.querySelector('[name="popup-name-form"]');
        const formUserInfo = popupElement.querySelector('[name="popup-description-form"]');
        
        const userInfoData = userInfo.getUserInfo();
        formUserName.value = userInfoData.user;
        formUserInfo.value = userInfoData.info;

        editProfile.open()
        
        
        });

    //Тут начинается движухка с карточками. 
        function renderCard(item) {
            const card = new Card({ handleCardClick: () => {
                    popupWithImage.open(item);
                    }
            },item, '#element');
            this.addItem(card.generateCard());
        };
    
        const validationCardPopup = new FormValidator(config, addCardPopup);
        const validationEditInfo =  new FormValidator(config, profilePopup);
    
        const popupWithImage = new PopupWithImage('.popup-image');
    
        popupWithImage.setEventListeners()
            
    
        api.getInitialCards()
            .then((res) => {                 
            const section = new Section({
                items: res.map(item => ({name: item.name, 
                                        link: item.link, 
                                        likes: item.likes.length, 
                                        id: item._id,
                                        owner: item.owner,
                                        myId: data._id })),
                renderer: renderCard
            }, '.elements');
            
            section.renderItems();
        });
    
    
    
    
        const addCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {  
                
            api.postCard(inputValues['mesto-name-form'], inputValues['mesto-url-form'])
            addCard.close();
    
            validationCardPopup.toggleButtonSave();
        });
        addCard.setEventListeners()

    
    //Слушатели и запуск функций.

    validationCardPopup.enableValidation();
    validationEditInfo.enableValidation();

    profileButtonAdd.addEventListener('click', () => {addCard.open()});
    profileAvatar.addEventListener('click', () => {
        document.querySelector('[name="mesto-url-form"]').value = data.avatar
        updateAvatar.open()
    });

});