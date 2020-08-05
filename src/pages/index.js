import './index.css'
import Card from '../js/components/Card.js'
import FormValidator from '../js/components/FormValidator.js'
import Section from '../js/components/Section.js'
import Popup from '../js/components/Popup.js'
import PopupWithImage from '../js/components/PopupWithImage.js'
import { initialCards } from '../js/utils/mocks.js'
import { resetForm, formSubmitHandler, hideError, resetButton, handleCardClick } from '../js/utils/utils.js'
import { popupInfo, popupImage, nameProfile, editButton, popupPlace, formInfo, addButton, closeButtonImage, closeButtonPlace, closeButtonInfo,
  formPlace, newPlaceNameInput, newPlaceLinkInput, placeTemplate, placeList, settingsObject, descriptionProfile, descriptionInput,
  nameInput } from '../js/utils/constants.js'

const cardsList = new Section({
    items: initialCards,
    renderer: (place) => {

      const newPlaceCard = new Card (place, placeTemplate, handleCardClick)
      const placeElement = newPlaceCard.generateCard()

      cardsList.addItem(placeElement)
    },
  },
  placeList
)

// отрисовка карточек
cardsList.renderItems()

// создадим экземпляры класса Popup для каждого попапа
// const popupPlaceIsOpened = new Popup(popupPlace)
const popupInfoIsOpened = new Popup(popupInfo)

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

  // togglePopup(popupPlace)
  // обнуляем поля в форме
  resetForm(formPlace)
}

// Слушатели

formInfo.addEventListener('submit', (evt) => {
  const submitButton = formInfo.querySelector('.popup__button')
  if (submitButton.classList.contains('popup__button_inactive')) { return false }
  else { formSubmitHandler(evt) }
})
formPlace.addEventListener('submit', (evt) => {
  const submitButton = formPlace.querySelector('.popup__button')
  if (submitButton.classList.contains('popup__button_inactive')) { return false }
  else {
    // cardsList.addItem(place)
    placeSubmitHandler(evt)
  }
})
editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent
  descriptionInput.value = descriptionProfile.textContent
  popupInfoIsOpened.open()
  hideError(formInfo)
  resetButton(popupInfo)
})
addButton.addEventListener('click', () => {
  // popupPlaceIsOpened.open()
  resetForm(formPlace)
  hideError(formPlace)
  resetButton(popupPlace)
})

// closeButtonPlace.addEventListener('click', () => { togglePopup(popupPlace) })
// closeButtonImage.addEventListener('click', () => { togglePopup(popupImage) })

// Создадим два экземпляра класса FormValidator для двух форм

const placeFormValidator = new FormValidator (settingsObject, formPlace)
const infoFormValidator = new FormValidator(settingsObject, formInfo)

placeFormValidator.enableValidation()
infoFormValidator.enableValidation()
