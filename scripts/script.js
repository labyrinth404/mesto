let formElement = document.querySelector('.popup__container')
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');

let popup = document.querySelector('.popup'),
    popupButtonClose = popup.querySelector('.popup__button-close'),
    popupButtonSave = popup.querySelector('.popup__button-save');

let profileInfo = document.querySelector('.profile__info'),
    profileName = profileInfo.querySelector('.profile__name'),
    profileDescription = profileInfo.querySelector('.profile__description'),
    profileButtonEdit = profileInfo.querySelector('.profile__button-edit');

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();

}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function openPopup() {
    popup.classList.add('popup_opened');
}



formElement.addEventListener('submit', formSubmitHandler);
profileButtonEdit.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);