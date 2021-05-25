const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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



function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup);
}

function openPopup(element) {
    element.classList.add('popup_opened');
    closeByEsc(element);
    closeByOverlay(element);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    element.removeEventListener('click', closeByOverlay);
}

function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closeByOverlay(element) {
    element.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(element);
        }
    });
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    closePopup(addCardPopup);
    elements.prepend(createCard(nameForm.value, urlForm.value));
    nameForm.value = '';
    urlForm.value = '';
    enableValidation();

}

function createCard(name, url) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true),
        deleteElement = newElement.querySelector('.element__trash'),
        likeElemenent = newElement.querySelector('.element__like'),
        imageElement = newElement.querySelector('.element__image'),
        textElement = newElement.querySelector('.element__text');

    imageElement.src = url;
    imageElement.alt = `Фото (${name})`;
    textElement.textContent = name;

    imageElement.addEventListener('click', () => {
        title.textContent = name;
        image.src = url;
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

function listCardsView() {
    initialCards.forEach((element) => {
        elements.append(createCard(element['name'], element['link']));
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

window.addEventListener('keydown', (e) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (e.key === 'Escape') {
        closePopup(popupOpened);
    }
});

enableValidation();