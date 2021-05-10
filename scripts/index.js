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

const profilePopup = document.querySelector('.popup-profile'),
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

const fullImageButtonClose = document.querySelector('.popup-image__button-close');




function popupSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopupButtonClose.closest('.popup'));
}

function openPopup(popup) {
    if (popup.classList == 'profile__button-edit' || popup.alt == 'Редактировать') {
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent;
        profilePopup.classList.add('popup_opened');

    } else if (popup.classList == 'profile__button-add' || popup.alt == 'Добавить') {
        addCardPopup.classList.add('popup_opened');

    } else if (popup.classList == 'element__image') {
        const fullImage = document.querySelector('.popup-image'),
            image = fullImage.querySelector('.popup-image__image'),
            title = fullImage.querySelector('.popup-image__title'),
            object = popup.closest(".element__description");

        title.textContent = object.querySelector('.element__text').textContent;
        image.src = object.querySelector('.element__image').src;
        fullImage.classList.add('popup_opened');
    }
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(addCardPopupButtonClose.closest('.popup'));
    elements.prepend(createCard(nameForm.value, urlForm.value));
    nameForm.value = '';
    urlForm.value = '';

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
        openPopup(imageElement);
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

popupElement.addEventListener('submit', popupSubmitHandler);
popupAddCardContainer.addEventListener('submit', formSubmitHandler);

profileButtonEdit.addEventListener('click', (e) => { openPopup(e.target) });
profileButtonAdd.addEventListener('click', (e) => { openPopup(e.target) });

profilePopupButtonClose.addEventListener('click', () => { closePopup(profilePopupButtonClose.closest('.popup')) });
addCardPopupButtonClose.addEventListener('click', () => { closePopup(addCardPopupButtonClose.closest('.popup')) });
fullImageButtonClose.addEventListener('click', () => { closePopup(fullImageButtonClose.closest('.popup')) });