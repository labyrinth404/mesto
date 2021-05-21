const toggleButtonSave = (buttonElement, inputList) => {
    if (hazInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove('form__input-type_error');
    errorElement.classList.remove('.form__input-error_active');
    errorElement.textContent = '';

};

const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`${inputElement.id}-error`);

    inputElement.classList.add('.form__input-type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('.form__input-error_active');
};

const checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
};

const setEventListener = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.popup__input')),
        buttonElement = formElement.querySelector('.popup__button-save');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonSave(buttonElement, inputList);
        })
    })
};


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListener(formElement);
    })
};

enableValidation();