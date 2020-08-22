export default class Card {
  constructor(place, template, openPopupWithImage, myId, openPopupDelCard) {
    this._name = place.name;
    this._link = place.link;
    this._id = place._id;
    this._likes = place.likes;
    this._owner = place.owner;
    this._myId = myId;
    this._template = template;
    this._openPopupWithImage = openPopupWithImage;
    this._openPopupDelCard = openPopupDelCard;
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
    const place = this._element.querySelector('.place')

    // Добавим данные
    placeImage.src = this._link
    placeImage.alt = this._name
    placeName.textContent = this._name
    place.id = this._id

    if (this._likes.length>=1) {
      placeLikes.textContent = this._likes.length
    }

    // если id автора карточки = id владельца страницы, то добавить карточке кнопку удаления и навесить на нее листенер
    if (this._owner._id === this._myId) {
      const cardDelButton = document.createElement('button')
      cardDelButton.classList.add('place__button-delete', 'transition')
      cardDelButton.setAttribute('type', 'button')
      cardDelButton.setAttribute('aria-label', 'Удалить')
      this._element.querySelector('.place').appendChild(cardDelButton)

      // добавим листенер для открытия попапа по клику на иконку удаления
      cardDelButton.addEventListener('click', () => {
        this._openPopupDelCard(this._id)
      })
    }

    this._placeListeners(placeImage, placeName)
    // Вернём элемент наружу
    return this._element
  }

  // Лайки
   _like(evt) {
    evt.target.classList.toggle('place__button-like_active')
  }

  // Слушатели для карточек
  _placeListeners(placeImage, placeName) {
    this._element.querySelector('.place__button-like').addEventListener('click', (evt) => { this._like(evt) })
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._openPopupWithImage(placeImage, placeName)
    })
  }
}
