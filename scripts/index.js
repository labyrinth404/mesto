const profilePopup = document.querySelector('.popup_profile'),
    popupElement = document.querySelector('.popup__container_profile'),
    nameInput = popupElement.querySelector('[name="popup-name-form"]'),
    jobInput = popupElement.querySelector('[name="popup-description-form"]'),
    profilePopupButtonClose = document.querySelector('.popup__button-close_profile');

const addCardPopup = document.querySelector('.popup-add-card'),
    addCardPopupButtonClose = addCardPopup.querySelector('.popup__button-close_add-card'),
    popupAddCardContainer = addCardPopup.querySelector('.popup__container_add-card'),
    nameForm = addCardPopup.querySelector('[name="mesto-name-form"]'),
    urlForm = addCardPopup.querySelector('[name="mesto-url-form"');

const profileInfo = document.querySelector('.profile'),
    profileName = profileInfo.querySelector('.profile__name'),
    profileDescription = profileInfo.querySelector('.profile__description'),
    profileButtonEdit = profileInfo.querySelector('.profile__button-edit'),
    profileButtonAdd = profileInfo.querySelector('.profile__button-add');

const elements = document.querySelector('.elements'),
    elementTemplate = elements.querySelector('#element').content;

const fullImageButtonClose = document.querySelector('.popup-image__button-close'),
    fullImage = document.querySelector('.popup-image'),
    image = fullImage.querySelector('.popup-image__image'),
    title = fullImage.querySelector('.popup-image__title');

const ESC_CODE = "Escape";

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input_active'
}


const submitProfileForm = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup);
}

const openPopup = (element) => {
    element.classList.add('popup_opened');
    window.addEventListener('keydown', eventKey);
}

const closePopup = (element) => {
    element.classList.remove('popup_opened');
    window.removeEventListener('keydown', eventKey);

}

const eventKey = (e) => {
    if (e.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const submitAddCardForm = (evt) =>{
    evt.preventDefault();
    closePopup(addCardPopup);
    const cardData = {
        name: nameForm.value,
        link: urlForm.value
    };
    
    elements.prepend(createCard(cardData));
    nameForm.value = '';
    urlForm.value = '';
    const { inputSelector, submitButtonSelector } = config;
        inputList = Array.from(addCardPopup.querySelectorAll(inputSelector)),
        buttonElement = addCardPopup.querySelector(submitButtonSelector);
    
    toggleButtonSave(buttonElement, inputList);

}

const createCard = (cardData) => {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true),
        deleteElement = newElement.querySelector('.element__trash'),
        likeElemenent = newElement.querySelector('.element__like'),
        imageElement = newElement.querySelector('.element__image'),
        textElement = newElement.querySelector('.element__text'),
        name = cardData['name'],
        url = cardData['link'];

    imageElement.src = url;
    imageElement.alt = `Фото (${name})`;
    textElement.textContent = name;

    imageElement.addEventListener('click', () => {
        image.src = url;
        image.alt = `Фото (${name})`;
        title.textContent = name;
        openPopup(fullImage);
    });

    deleteElement.addEventListener('click', () => {
        newElement.remove();
    });

    likeElemenent.addEventListener('click', () => {
        likeElemenent.classList.toggle('element__like_active');
    });

    return newElement;
}

const listCardsView = () => {
    initialCards.forEach((element) => { 
        elements.append(createCard(element));
    });
}

listCardsView();

popupElement.addEventListener('submit', submitProfileForm);
popupAddCardContainer.addEventListener('submit', submitAddCardForm);

profileButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(profilePopup)
});
profileButtonAdd.addEventListener('click', () => { openPopup(addCardPopup) });

profilePopupButtonClose.addEventListener('click', () => { closePopup(profilePopup) });
addCardPopupButtonClose.addEventListener('click', () => { closePopup(addCardPopup) });
fullImageButtonClose.addEventListener('click', () => { closePopup(fullImage) });

window.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
});

enableValidation(config);