export class Card {
    #text
    #image
    #likes
    #id
    #cardSelector
    #element
    #handleCardClick
    #handleCardLike
    #handleCardTrash
    #owner
    #myId
    #imageSelector
    #textSelector
    #likeSelector
    #countSelector
    #trashSelector

    constructor ({ handleCardClick, handleCardLike, handleCardTrash, }, cardData, cardSelector) {
        
        this.#text = cardData.name;
        this.#image = cardData.link;
        this.#likes = cardData.likes;
        this.#id = cardData.id;
        this.#owner = cardData.owner._id;
        this.#myId = cardData.userId;
        this.#cardSelector = cardSelector;
        this.#handleCardClick = handleCardClick;
        this.#handleCardLike = handleCardLike;
        this.#handleCardTrash = handleCardTrash;
        this.#element = this.#getTemplate();
        this.#imageSelector = this.#element.querySelector('.element__image');
        this.#textSelector = this.#element.querySelector('.element__text');
        this.#likeSelector = this.#element.querySelector('.element__like');
        this.#countSelector = this.#element.querySelector('.element__count');
        this.#trashSelector = this.#element.querySelector('.element__trash');
    }

    #getTemplate() {
        const cardElement = document
        .querySelector(this.#cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement
    }

    generateCard() {
        this.#setEventListener();
        this.#element.id = this.#owner
 
        this.#imageSelector.src = this.#image;
        this.#imageSelector.alt = `Фото(${this.#text})`;
        this.#textSelector.textContent = this.#text;
        this.#imageSelector.id = this.#id;
        this.#countSelector.textContent = this.#likes.length;

        if(this.#likes.find(like => like._id == this.#myId) !== undefined) {
            this.#likeSelector.classList.add('element__like_active');
        }
        

        return this.#element
    }

    #setEventListener() {
        
        this.#hideTrashButton();

        this.#imageSelector.addEventListener('click', () => { this.#handleCardClick() });
        this.#likeSelector.addEventListener('click', () => { 
            this.#handleCardLike();
            this.#handleLikeClick();
         });
        this.#trashSelector.addEventListener('click', () => { this.#handleCardTrash() });

    }

    #handleLikeClick() {
        
        if(this.#likes.find(like => like._id == this.#myId) !== undefined) {
            this.#likeSelector.classList.remove('element__like_active');
            this.#countSelector.textContent = +this.#countSelector.textContent - 1;
        } else {
            this.#likeSelector.classList.add('element__like_active');
            this.#countSelector.textContent = +this.#countSelector.textContent + 1;
        }
    }

    deleteTrashClick() {
        this.#element.remove();
        this.#element = null;
    }
    
    #hideTrashButton(){
        if(this.#owner !== this.#myId){
            this.#trashSelector.style.visibility = "hidden"
        }  
    }
}

