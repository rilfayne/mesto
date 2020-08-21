export default class Card {
  constructor(place, template, openPopup) {
    this._name = place.name;
    this._link = place.link;
    this._likes = place.likes;
    this._template = template;
    this._openPopup = openPopup;
  }

  // Метод, который клонирует содержимое тега template
  _getTemplate() {
    // клонируем содержимое тега template
    return  this._template.cloneNode(true)
  }

  // Метод, который вставит данные в разметку и подготовит карточку к публикации.
  generateCard() {
    this._element = this._getTemplate()
    const placeImage = this._element.querySelector('.place__image')
    const placeName = this._element.querySelector('.place__name')
    const placeLikes = this._element.querySelector('.place__likes')
    this._placeListeners(placeImage, placeName)

    // Добавим данные
    placeImage.src = this._link
    placeImage.alt = this._name
    placeName.textContent = this._name
    if (this._likes.length>=1) {
      placeLikes.textContent = this._likes.length
    }

    // Вернём элемент наружу
    return this._element
  }

  // Лайки
   _like(evt) {
    evt.target.classList.toggle('place__button-like_active')
  }

  // Удаление карточки
  _deleteCard(evt) {
    evt.target.closest('.place').remove()
  }

  // Слушатели для карточек
  _placeListeners(placeImage, placeName) {
    this._element.querySelector('.place__button-delete').addEventListener('click', (evt) => { this._deleteCard(evt) })
    this._element.querySelector('.place__button-like').addEventListener('click', (evt) => { this._like(evt) })
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._openPopup(placeImage, placeName)
    })
  }
}
