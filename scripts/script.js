let popupElement = document.querySelector('.popup__container')
let nameInput = popupElement.querySelector('[name="popup-name-form"]');
let jobInput = popupElement.querySelector('[name="popup-description-form"]');

let popup = document.querySelector('.popup'),
    popupButtonClose = popup.querySelector('.popup__button-close'),
    popupButtonSave = popup.querySelector('.popup__button-save');

let form = document.querySelector('.form'),
    formButtonCLose = form.querySelector('.form__button-close'),
    formButtonSave = form.querySelector('.form__button-save'),
    formElement = form.querySelector('.form__container'),
    nameMesto = formElement.querySelector('[name="mesto-name-form"]'),
    urlMesto = formElement.querySelector('[name="mest-url-form]');

let profileInfo = document.querySelector('.profile'),
    profileName = profileInfo.querySelector('.profile__name'),
    profileDescription = profileInfo.querySelector('.profile__description'),
    profileButtonEdit = profileInfo.querySelector('.profile__button-edit'),
    profileButtonAdd = profileInfo.querySelector('.profile__button-add');

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

function openForm() {
    form.classList.add('form_opened');
}

function closeForm() {
    form.classList.remove('form_opened');
    nameMesto.value = '';
    urlMesto.value = '';

}



popupElement.addEventListener('submit', formSubmitHandler);

popupButtonClose.addEventListener('click', closePopup);
profileButtonEdit.addEventListener('click', openPopup);

formButtonCLose.addEventListener('click', closeForm);
profileButtonAdd.addEventListener('click', openForm);