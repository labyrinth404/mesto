/*
// Находим форму в DOM
let formElement = document.querySelector('.');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
*/
let popup = document.querySelector('.popup'),
    popupButtonClose = popup.querySelector('.popup__button-close'),
    popupButtonSave = popup.querySelector('.popup__button-save');

let profileInfo = document.querySelector('.profile__info'),
    profileName = profileInfo.querySelector('.profile__name'),
    profileDescription = profileInfo.querySelector('.profile__description'),
    profileButtonEdit = profileInfo.querySelector('.profile__button-edit');

console.log(popupName.value);

function closePopup() {
    popup.classList.remove('popup_opened');
}

function openPopup() {
    popup.classList.add('popup_opened');
}

function saveProfile() {
    let popupName = popup.querySelector('.popup__name'),
        popupDescription = popup.querySelector('.popup__description');

    popupName.value;
    popupDescription.value;

}
profileButtonEdit.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
popupButtonSave.addEventListener('click', saveProfile);