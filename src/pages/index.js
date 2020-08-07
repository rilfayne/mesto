import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import { initialCards } from '../utils/mocks.js'
import { popupInfo, nameProfile, editButton, popupPlace, formInfo, addButton, formPlace, placeTemplate, placeList, settingsObject,
  descriptionProfile, popupImage, imageInPopup, nameImageInPopup, nameInput, descriptionInput } from '../utils/constants.js'

const handleCardClick = function (placeImage, placeName) {
  const popupWithImage = new PopupWithImage(popupImage, imageInPopup, nameImageInPopup)
  popupWithImage.open(placeImage, placeName)
  popupWithImage.setEventListeners()
  popupImage.classList.add('popup_opened')
}

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

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile
})

// создадим экземпляры класса Popup для каждого попапа
const placePopup = new PopupWithForm(popupPlace, (place) => {

  // Создаем экземпляр класса Card
  const newPlaceCard = new Card (place, placeTemplate, handleCardClick)
  const placeElement = newPlaceCard.generateCard()


  cardsList.addItem(placeElement)
})

const infoPopup = new PopupWithForm(popupInfo, () => {
  user.setUserInfo(nameInput, descriptionInput)
})

placePopup.setEventListeners()
infoPopup.setEventListeners()

// Слушатели

editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo()
  nameInput.value = userInfo.name
  descriptionInput.value = userInfo.description
  infoPopup.open()
  infoFormValidator.hideError()
  infoFormValidator.resetButton()
})
addButton.addEventListener('click', () => {
  placePopup.open()
  placeFormValidator.hideError()
  placeFormValidator.resetButton()
})

// Создадим два экземпляра класса FormValidator для двух форм

const placeFormValidator = new FormValidator (settingsObject, formPlace)
const infoFormValidator = new FormValidator(settingsObject, formInfo)

placeFormValidator.enableValidation()
infoFormValidator.enableValidation()
