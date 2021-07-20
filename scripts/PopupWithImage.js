import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
  }

  open(image, title){
    super.open()
    this.image = image;
    this.title = title;

    const fullImage = document.querySelector('.popup-image');
    
    fullImage.querySelector('.popup-image__image').src = this.image; 
    fullImage.querySelector('.popup-image__image').alt = `Фото (${this.title})`;
    fullImage.querySelector('.popup-image__title').textContent = this.title;
  }
}