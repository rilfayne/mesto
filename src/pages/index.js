import './index.css'
import Card from '../js/components/Card.js'
import FormValidator from '../js/components/FormValidator.js'
import Section from '../js/components/Section.js'
import PopupWithForm from '../js/components/PopupWithForm.js'
import { initialCards } from '../js/utils/mocks.js'
import { hideError, resetButton, handleCardClick } from '../js/utils/utils.js'
import { popupInfo, nameProfile, editButton, popupPlace, formInfo, addButton, formPlace, newPlaceNameInput, newPlaceLinkInput,
  placeTemplate, placeList, settingsObject, descriptionProfile, descriptionInput, nameInput } from '../js/utils/constants.js'

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
const placePopup = new PopupWithForm(popupPlace, () => {
  // Создаем новый объект
  const place = {
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
  }

  // Создаем экземпляр класса Card
  const newPlaceCard = new Card (place, placeTemplate)
  const placeElement = newPlaceCard.generateCard()

  placeList.prepend(placeElement)
})

const infoPopup = new PopupWithForm(popupInfo, () => {
  nameProfile.textContent = nameInput.value
  descriptionProfile.textContent = descriptionInput.value
})

placePopup.setEventListeners()
infoPopup.setEventListeners()

// Слушатели

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent
  descriptionInput.value = descriptionProfile.textContent
  infoPopup.open()
  hideError(formInfo)
  resetButton(popupInfo)
})
addButton.addEventListener('click', () => {
  placePopup.open()
  hideError(formPlace)
  resetButton(popupPlace)
})

// Создадим два экземпляра класса FormValidator для двух форм

const placeFormValidator = new FormValidator (settingsObject, formPlace)
const infoFormValidator = new FormValidator(settingsObject, formInfo)

placeFormValidator.enableValidation()
infoFormValidator.enableValidation()
