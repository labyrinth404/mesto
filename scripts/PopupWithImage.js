import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor({image, title}){
    super(selector)
    this.image = image;
    this.title = title;
  }

  open(){
    const fullImage = document.querySelector('.popup-image');
    
    fullImage.querySelector('.popup-image__image').src = this.image; 
    fullImage.querySelector('.popup-image__image').alt = `Фото (${this.title})`;
    fullImage.querySelector('.popup-image__title').textContent = this.title;
  }
}