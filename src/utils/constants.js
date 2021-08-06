export const profilePopup = document.querySelector('.popup_type_profile');
export const popupElement = document.querySelector('.popup__container_profile');
export const nameInput = popupElement.querySelector('[name="popup-name-form"]');
export const jobInput = popupElement.querySelector('[name="popup-description-form"]');
export const profilePopupButtonClose = document.querySelector('.popup__button-close_profile');

export const addCardPopup = document.querySelector('.popup_type_add-card');
export const addCardPopupForm = addCardPopup.querySelector('.popup__form');
export const addCardPopupButtonClose = addCardPopup.querySelector('.popup__button-close_add-card');
export const popupAddCardContainer = addCardPopup.querySelector('.popup__container_add-card');
export const nameForm = addCardPopup.querySelector('[name="mesto-name-form"]');
export const urlForm = addCardPopup.querySelector('[name="mesto-url-form"');

export const profileInfo = document.querySelector('.profile');
export const profileName = profileInfo.querySelector('.profile__name');
export const profileDescription = profileInfo.querySelector('.profile__description');
export const profileButtonEdit = profileInfo.querySelector('.profile__button-edit');
export const profileButtonAdd = profileInfo.querySelector('.profile__button-add');
export const elements = document.querySelector('.elements');
export const fullImageButtonClose = document.querySelector('.popup-image__button-close');
export const fullImage = document.querySelector('.popup-image');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const profileAvatar = document.querySelector('.profile__update');
export const avatar = document.querySelector('.profile__avatar');
export const count = document.querySelector('.element__count');

export const formUserName = popupElement.querySelector('[name="popup-name-form"]');
export const formUserInfo = popupElement.querySelector('[name="popup-description-form"]');


export const ESC_CODE = "Escape";

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input_active'
}