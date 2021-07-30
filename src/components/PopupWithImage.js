import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  open({ name, link }){
    super.open()
    this.title = name;
    this.image = link;
    

    const fullImage = this.popup.querySelector('.popup-image__container');
    
    fullImage.querySelector('.popup-image__image').src = this.image; 
    fullImage.querySelector('.popup-image__image').alt = `Фото (${this.title})`;
    fullImage.querySelector('.popup-image__title').textContent = this.title;
  }
}