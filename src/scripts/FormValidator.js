export class FormValidator {
    #form
    #inputSelector
    #submitButtonSelector
    #inputList
    #buttonElement
    #errorElement
    #inputErrorClass
    #errorClass

    constructor(config, form) {
        this.#form = form;
        this.#inputSelector = config.inputSelector;
        this.#submitButtonSelector = config.submitButtonSelector;
        this.#inputErrorClass = config.inputErrorClass;
        this.#errorClass = config.errorClass;
        
    }

    enableValidation(){    
        
        this.#setEventListener(this.#form)

    }

    #setEventListener(){
        this.#form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this.#inputList = Array.from(this.#form.querySelectorAll(this.#inputSelector));
        this.#buttonElement =  this.#form.querySelector(this.#submitButtonSelector);

        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#checkInputValidity(inputElement);
                this.toggleButtonSave();
            })
        })
        this.toggleButtonSave();
    }

    #checkInputValidity(inputElement){
        if (inputElement.validity.valid) {
            this.#hideInputError(inputElement);
        } else {
            this.#showInputError(inputElement);
        }
    }

    #showInputError(inputElement){
        const errorElement =  this.#form.querySelector(`#${inputElement.id}-error`);
        
        this.#errorElement = errorElement;
    
        inputElement.classList.add(this.#inputErrorClass);
        this.#errorElement.textContent = inputElement.validationMessage;
        this.#errorElement.classList.add(this.#errorClass);
    }


    #hasInvalidInput(){
        return this.#inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });

    }

    #hideInputError(inputElement){
        
        const errorElement =  this.#form.querySelector(`#${inputElement.id}-error`);
 
        this.#errorElement = errorElement;

        inputElement.classList.remove(this.#inputErrorClass);
        this.#errorElement.classList.remove(this.#errorClass);
        this.#errorElement.textContent = '';

    }

    toggleButtonSave(){
        if (this.#hasInvalidInput(this.#inputList)) {
            this.#buttonElement.disabled = true;
        } else {
            this.#buttonElement.disabled = false;
        }
    }
}