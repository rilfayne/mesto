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
const formPlace = document.querySelector('.popup__form_place')

// Открытие и закрытие попапов

const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened')
  document.activeElement.blur()
}

// Заполнение попапа Image

const fillPopupImage = function(evt) {
  const imageTemplate = document.querySelector('.popup-image-template').content
  const imageElement = imageTemplate.cloneNode(true)
  const imageContainer = document.querySelector('.popup__image-container')

  imageElement.querySelector('.popup__image').src = evt.target.src
  imageElement.querySelector('.popup__image').alt = evt.target.alt
  imageElement.querySelector('.popup__image-name').textContent = evt.target.alt

  imageContainer.append(imageElement)
}

// Изменение данных профиля через попапа Info

const formSubmitHandler = function(evt) {
  evt.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  togglePopup(popupInfo)
}

// Загрузка карточек на страницу из массива

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

// Добавление новой карточки

const placeSubmitHandler = function(evt) {
  evt.preventDefault();

  let newPlaceNameInput = document.querySelector('.popup__input_place-name')
  let newPlaceLinkInput = document.querySelector('.popup__input_link')

  // подгружаем данные из формы в массив
  
  const placeName = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  }

    showCards(placeName)
    togglePopup(popupPlace)

  // обнуляем поля в форме
  newPlaceLinkInput.value = '' 
  newPlaceNameInput.value = ''
}

// Лайки

const like = function (evt) {
  evt.target.classList.toggle('place__button-like_active')
  document.activeElement.blur()
}

// Удаление карточки

const deleteCard = function (evt) {
  evt.target.closest('.place').remove()
}

// Закрытие попапа по клику на полупрозрачный фон
const closePopupOutside = function(evt) {
  if (evt.target !== evt.currentTarget) { return } 
  togglePopup(evt.target)
}

// Закрытие попапа по клику на Esc

const closePopupEsc = function(popup) {
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_opened')
    }
    if (popup === popupImage) {
      document.querySelector('.popup__image-container').innerHTML = ''
    }
  })
}

// Слушатели

popupInfo.addEventListener('click', closePopupOutside)
popupPlace.addEventListener('click', closePopupOutside)
popupImage.addEventListener('click', (evt) => {
  if (evt.target === popupImage.querySelector('.popup__image')) { return }
  else {
      document.querySelector('.popup__image-container').innerHTML = ''
      togglePopup(popupImage)
  }
})
formInfo.addEventListener('submit', formSubmitHandler)
formPlace.addEventListener('submit', placeSubmitHandler)
editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  togglePopup(popupInfo)
  closePopupEsc(popupInfo)
})
addButton.addEventListener('click', () => {
  togglePopup(popupPlace)
  closePopupEsc(popupPlace)
})
closeButtonInfo.addEventListener('click', () => {togglePopup(popupInfo)})
closeButtonPlace.addEventListener('click', () => {togglePopup(popupPlace)})

// Слушатели для карточек

const placeListener = function (placeElement) {
  placeElement.querySelector('.place__button-delete').addEventListener('click', deleteCard)
  placeElement.querySelector('.place__button-like').addEventListener('click', like)
  placeElement.querySelector('.place__image').addEventListener('click', (evt) => {
    fillPopupImage(evt)
    closePopupEsc(popupImage)
    togglePopup(popupImage)
  })
}

// Перебор массива. Для каждого элемента применить функцию showCards
initialCards.forEach(place => {
  showCards(place)
})