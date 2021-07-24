import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  open(item){
    super.open()
    this.image = item.link;
    this.title = item.name;

    const fullImage = this.popup.querySelector('.popup-image__container');
    
    fullImage.querySelector('.popup-image__image').src = this.image; 
    fullImage.querySelector('.popup-image__image').alt = `Фото (${this.title})`;
    fullImage.querySelector('.popup-image__title').textContent = this.title;
  }
}