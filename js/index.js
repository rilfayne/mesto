import { initialCards } from './mocks.js';
import Card from './Card.js';

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
const newPlaceNameInput = document.querySelector('.popup__input_place-name')
const newPlaceLinkInput = document.querySelector('.popup__input_link')
const imageInPopup = document.querySelector('.popup__image')
const nameImageInPopup = document.querySelector('.popup__image-name')
const placeTemplate = document.querySelector('.place-template').content
const placeList = document.querySelector('.places__list')

// Открытие и закрытие попапов

const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened')
  document.activeElement.blur()

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keyup', closePopupEsc)
    popup.addEventListener('mousedown', closePopupOutside)
  }
  else {
    document.removeEventListener('keyup', closePopupEsc)
    popup.removeEventListener('mousedown', closePopupOutside)
  }
}

// Функция очистки формы

const resetForm = function(form) {
  form.reset()
}

// Заполнение попапа Image

const fillPopupImage = function(evt) {
    imageInPopup.src = ''
    imageInPopup.alt = ''
    nameImageInPopup.textContent = ''

    imageInPopup.src = evt.target.src
    imageInPopup.alt = evt.target.alt
    nameImageInPopup.textContent = evt.target.alt
}

// Изменение данных профиля через попап Info

const formSubmitHandler = function(evt) {
  evt.preventDefault()

  nameProfile.textContent = nameInput.value
  descriptionProfile.textContent = descriptionInput.value

  togglePopup(popupInfo)
}

// Добавление новой карточки

const placeSubmitHandler = function(evt) {
  evt.preventDefault()

  // подгружаем данные из формы в массив
  const placeName = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  }

    showCards(placeName)
    togglePopup(popupPlace)
  // обнуляем поля в форме
  resetForm(formPlace)
}

// Закрытие попапа по клику на оверлей
const closePopupOutside = function(evt) {
  if (evt.target !== evt.currentTarget) { return }
  togglePopup(evt.target)
}

// Закрытие попапа по клику на Esc

const closePopupEsc = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    togglePopup(openedPopup)
  }
}

// Слушатели

formInfo.addEventListener('submit', (evt) => {
  const submitButton = formInfo.querySelector('.popup__button')
  if (submitButton.classList.contains('popup__button_inactive')) { return }
  else { formSubmitHandler(evt) }
})
formPlace.addEventListener('submit', (evt) => {
  const submitButton = formPlace.querySelector('.popup__button')
  if (submitButton.classList.contains('popup__button_inactive')) { return }
  else { placeSubmitHandler(evt) }
})
editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent
  descriptionInput.value = descriptionProfile.textContent
  togglePopup(popupInfo)
  hideError(formInfo)
  resetButton(popupInfo)
})
addButton.addEventListener('click', () => {
  togglePopup(popupPlace)
  resetForm(formPlace)
  hideError(formPlace)
  resetButton(popupPlace)
})
closeButtonInfo.addEventListener('click', () => { togglePopup(popupInfo) })
closeButtonPlace.addEventListener('click', () => { togglePopup(popupPlace) })
closeButtonImage.addEventListener('click', () => { togglePopup(popupImage) })

initialCards.forEach(place => {
  const card = new Card(place, placeTemplate)
  const placeElement = card.generateCard();

  placeList.prepend(placeElement)

})

export { togglePopup, fillPopupImage }
