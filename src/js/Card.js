import { togglePopup, fillPopupImage, popupImage } from './utils.js'

export default class Card {
  constructor(place, template) {
    this._name = place.name;
    this._link = place.link;
    this._template = template;
  }

  // Метод, который клонирует содержимое тега template
  _getTemplate() {
    // клонируем содержимое тега template
    const placeElement = this._template.cloneNode(true)
    return placeElement
  }

  // Метод, который вставит данные в разметку и подготовит карточку к публикации.
  generateCard() {
    this._element = this._getTemplate()
    const placeImage = this._element.querySelector('.place__image')
    const placeName = this._element.querySelector('.place__name')
    this._placeListeners();

    // Добавим данные
    placeImage.src = this._link
    placeImage.alt = this._name
    placeName.textContent = this._name

    // Вернём элемент наружу
    return this._element
  }

  // Лайки
   _like(evt) {
    evt.target.classList.toggle('place__button-like_active')
    document.activeElement.blur()
  }

  // Удаление карточки
  _deleteCard(evt) {
    evt.target.closest('.place').remove()
  }

  // Слушатели для карточек
  _placeListeners() {
    this._element.querySelector('.place__button-delete').addEventListener('click', (evt) => { this._deleteCard(evt) })
    this._element.querySelector('.place__button-like').addEventListener('click', (evt) => { this._like(evt) })
    this._element.querySelector('.place__image').addEventListener('click', (evt) => {
      fillPopupImage(evt)
      togglePopup(popupImage)
    })
  }
}
