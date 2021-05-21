const checkInputValidity = (inputElement) => {
    console.log(inputElement.validity);
}

const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventLisstener('input', () => {
            checkInputValidity(inputElement);
        })
    })
};


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListener(formElement);
    })
};

