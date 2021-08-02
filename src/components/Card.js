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

        this.#checkCardLike()
        this.#element.querySelector('.element__image').src = this.#image;
        this.#element.querySelector('.element__image').alt = `Фото(${this.#text})`;
        this.#element.querySelector('.element__text').textContent = this.#text;
        this.#element.querySelector('.element__image').id = this.#id;
        this.#element.querySelector('.element__count').textContent = this.#likes > 0 ? this.#likes : '';
        
 
    
        return this.#element
    }

    #setEventListener() {
        this.#hideTrashButton();
        this.#element.querySelector('.element__image').addEventListener('click', () => {
            this.#handleCardClick()});

        this.#element.querySelector('.element__like').addEventListener('click', () => {
        this.#handleLikeClick();
        this.#handleCardLike();
        });
        this.#element.querySelector('.element__trash').addEventListener('click', () => {
            this.#handleCardTrash();
        });

    }

    #handleLikeClick() {
        if(!this.#element.querySelector('.element__like').classList.contains('element__like_active')) {
            this.#element.querySelector('.element__like').classList.add('element__like_active');
            this.#element.querySelector('.element__count')
            .textContent = +this.#element.querySelector('.element__count').textContent + 1;
        } else {
            this.#element.querySelector('.element__like').classList.remove('element__like_active');
            this.#element.querySelector('.element__count')
            .textContent = +this.#element.querySelector('.element__count').textContent - 1;
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

