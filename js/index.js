import { initialCards } from './mocks.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { popupInfo, popupImage, togglePopup, resetForm, formSubmitHandler, hideError, resetButton } from './utils.js'

const editButton = document.querySelector('.profile__edit-button')
const popupPlace = document.querySelector('.popup_place')
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
const placeTemplate = document.querySelector('.place-template').content
const placeList = document.querySelector('.places__list')

const settingsObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

// Добавление новой карточки
const placeSubmitHandler = function(evt) {
  evt.preventDefault()

  // Создаем новый объект
  const place = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  }

  // Создаем экземпляр класса Card
  const newPlaceCard = new Card (place, placeTemplate)
  const placeElement = newPlaceCard.generateCard();

  placeList.prepend(placeElement)

  togglePopup(popupPlace)
  // обнуляем поля в форме
  resetForm(formPlace)
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
  const card = new Card (place, placeTemplate)
  const placeElement = card.generateCard();

  placeList.prepend(placeElement)
})

// Создадим два экземпляра класса FormValidator для двух форм

const placeFormValidator = new FormValidator (settingsObject, formPlace)
const infoFormValidator = new FormValidator(settingsObject, formInfo)

placeFormValidator.enableValidation()
infoFormValidator.enableValidation()
