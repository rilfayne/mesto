const initialCards = [
  {
      name: 'Сибирь',
      link: 'https://images.unsplash.com/photo-1589659925724-1dbf17849e93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
  },
  {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1580474256381-f98bb0532dc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1552857407-c7e8dec595e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=973&q=80'
  },
  {
      name: 'Карелия',
      link: 'https://images.unsplash.com/photo-1559029884-4e34093db5b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1552321570-b74810c6265d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
  },
  {
      name: 'Тулиновка',
      link: 'https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
  }
]

const editButton = document.querySelector('.profile__edit-button')
const popupInfo = document.querySelector('.popup_info')
const popupPlace = document.querySelector('.popup_place')
const popupImage = document.querySelector('.popup_image')
const formInfo = document.querySelector('.popup__form_info')
const nameInput = document.querySelector('.popup__input_name')
const descriptionInput = document.querySelector('.popup__input_description')
const nameProfile = document.querySelector('.profile__name')
const descriptionProfile = document.querySelector('.profile__description')
const addButton = document.querySelector('.profile__add-button')
const closeButtonInfo = document.querySelector('.popup__close_info')
const closeButtonPlace = document.querySelector('.popup__close_place')
const closeButtonImage = document.querySelector('.popup__close_image')
const formPlace = document.querySelector('.popup__form_place')

// Открытие попапа Info

const openPopupInfo = function() {

  popupInfo.classList.add('popup_opened')

  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// Открытие попапа Place

const openPopupPlace = function() {
  popupPlace.classList.add('popup_opened')
}

// Открытие попапа Image

const openPopupImage = function (evt) {
  popupImage.classList.add('popup_opened')

  const imageTemplate = document.querySelector('.popup-image-template').content
  const imageElement = imageTemplate.cloneNode(true)
  const imageFigure = document.querySelector('.popup__image-fiqure')

  imageElement.querySelector('.popup__image').src = evt.target.src
  imageElement.querySelector('.popup__image').alt = evt.target.alt
  imageElement.querySelector('.popup__image-name').textContent = evt.target.alt

  imageFigure.append(imageElement)
}

// Закрытие попапа Info

const closePopupInfo = function() {
  popupInfo.classList.remove('popup_opened')
}

// Закрытие попапа Place

const closePopupPlace = function() {
  popupPlace.classList.remove('popup_opened')
}

// Закрытие попапа Image

const closePopupImage = function() {
  popupImage.classList.remove('popup_opened')
  const fiqure = document.querySelector('.popup__image-fiqure')
  fiqure.innerHTML = ''
}

// Закрытие попапа по клику на полупрозрачный фон
const closePopupOutside = function(evt) {
  if (evt.target !== evt.currentTarget) { return } 
  closePopupInfo(evt)
  closePopupPlace(evt)
  closePopupImage(evt)
}

// Изменение данных профиля

const formSubmitHandler = function(evt) {
  evt.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  closePopupInfo(evt)
}

// Загрузка карточек из массива

const showCards = function(place) {
  // клонируем содержимое тега template
  const placeTemplate = document.querySelector('.place-template').content
  const placeElement = placeTemplate.cloneNode(true)
  const placeList = document.querySelector('.places__list')

  // наполняем сожержимым из массива
  placeElement.querySelector('.place__image').src = place.link
  placeElement.querySelector('.place__image').alt = place.name
  placeElement.querySelector('.place__name').textContent = place.name

  placeListener(placeElement)
  // отображаем на странице
  placeList.prepend(placeElement)
}

const placeListener = function (placeElement) {
  placeElement.querySelector('.place__button-delete').addEventListener('click', deleteCard)
  placeElement.querySelector('.place__button-like').addEventListener('click', like)
  placeElement.querySelector('.place__image').addEventListener('click', openPopupImage)
}

// ДОБАВИМ НОВУЮ КАРТОЧКУ

const placeSubmitHandler = function(evt) {
  evt.preventDefault();

  let newPlaceNameInput = document.querySelector('.popup__input_place-name')
  let newPlaceLinkInput = document.querySelector('.popup__input_link')

  // подгружаем данные из формы в массив
  
  const placeName = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
    alt: newPlaceNameInput.value
  }

  showCards(placeName)
  // закрываем окно
  closePopupPlace(evt)

  // обнуляем поля в форме
  newPlaceLinkInput.value = '' 
  newPlaceNameInput.value = ''
}

// ЛАЙКИ

const like = function (evt) {
  evt.target.classList.toggle('place__button-like_active')
}

// Удаление карточки

const deleteCard = function (evt) {
  const card = evt.target.closest('.place');

  card.remove();
}

// Слушатели

editButton.addEventListener('click', openPopupInfo)
addButton.addEventListener('click', openPopupPlace)
closeButtonInfo.addEventListener('click', closePopupInfo)
closeButtonPlace.addEventListener('click', closePopupPlace)
popupInfo.addEventListener('click', closePopupOutside)
popupPlace.addEventListener('click', closePopupOutside)
popupImage.addEventListener('click', closePopupOutside)
formInfo.addEventListener('submit', formSubmitHandler)
formPlace.addEventListener('submit', placeSubmitHandler)
closeButtonImage.addEventListener('click', closePopupImage)

// Перебор массива. Для каждого элемента применить функцию showCards
initialCards.forEach(place => {
  showCards(place)
})