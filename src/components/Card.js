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
    #checkCardLike
    #imageSelector
    #textSelector
    #likeSelector
    #countSelector
    constructor ({ handleCardClick, handleCardLike, handleCardTrash, checkCardLik}, cardData, cardSelector) {
        this.#text = cardData.name;
        this.#image = cardData.link;
        this.#likes = cardData.likes.length;
        this.#id = cardData.id;
        this.#owner = cardData.owner._id;
        this.#myId = cardData.myId;
        this.#cardSelector = cardSelector;
        this.#handleCardClick = handleCardClick;
        this.#handleCardLike = handleCardLike;
        this.#handleCardTrash = handleCardTrash;
        this.#checkCardLike = checkCardLik
         
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
        this.#element = this.#getTemplate();
        this.#setEventListener();
        this.#element.id = this.#owner
        this.#imageSelector = this.#element.querySelector('.element__image');
        this.#textSelector = this.#element.querySelector('.element__text');
        this.#likeSelector = this.#element.querySelector('.element__like');
        this.#countSelector = this.#element.querySelector('.element__count');

        this.#checkCardLike()
        this.#imageSelector.src = this.#image;
        this.#imageSelector.alt = `Фото(${this.#text})`;
        this.#textSelector.textContent = this.#text;
        this.#imageSelector.id = this.#id;
        this.#countSelector.textContent = this.#likes > 0 ? this.#likes : '';
        
    
        return this.#element
    }

    #setEventListener() {
        debugger
        this.#hideTrashButton();
        this.#imageSelector.addEventListener('click', () => {
            this.#handleCardClick()});

        this.#likeSelector.addEventListener('click', () => {
        this.#handleLikeClick();
        this.#handleCardLike();
        });
        this.#element.querySelector('.element__trash').addEventListener('click', () => {
            this.#handleCardTrash();
        });

    }

    #handleLikeClick() {
        if(!this.#likeSelector.classList.contains('element__like_active')) {
            this.#likeSelector.classList.add('element__like_active');
            this.#countSelector.textContent = +this.#countSelector.textContent.textContent + 1;
        } else {
            this.#likeSelector.classList.remove('element__like_active');
            this.#countSelector.textContent = +this.#countSelector.textContent.textContent - 1;
        }

        
    }

    deleteTrashClick() {
        this.#element.remove();
        this.#element = null;
    }
    #hideTrashButton(){
        if(this.#owner !== this.#myId){
            this.#element.querySelector('.element__trash').style.visibility = "hidden"
        }  
    }

}

