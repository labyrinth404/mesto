const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonSave = (buttonElement, inputList) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    const { inputErrorClass, errorClass } = config;

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';


};

const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    const { inputErrorClass, errorClass } = config;

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
};

const setEventListener = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector)),
        buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonSave(buttonElement, inputList);
        })
    })
    toggleButtonSave(buttonElement, inputList);
};


const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListener(formElement, restConfig);
    })
};