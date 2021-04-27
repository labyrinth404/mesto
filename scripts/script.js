let formElement = document.querySelector('.popup__container')
let nameInput = formElement.querySelector('[name="popup-name-form"]');
let jobInput = formElement.querySelector('[name="popup-description-form"]');

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


function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');

}
function closePopup() {
    popup.classList.remove('popup_opened');
}



formElement.addEventListener('submit', formSubmitHandler);
popupButtonClose.addEventListener('click', closePopup);
profileButtonEdit.addEventListener('click', openPopup);