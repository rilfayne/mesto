import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { popupInfo, nameProfile, editButton, popupPlace, formInfo, addButton, formPlace, placeTemplate, placeList,
  settingsObject,
  descriptionProfile, popupImage, imageInPopup, nameImageInPopup, nameInput, descriptionInput } from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'a443eb38-3b02-4168-b5e2-cad025c42c56',
    'Content-Type': 'application/json'
  }
})

// Загрузка данных пользователя с сервера
api.getUserInfo()
  .then((data) => {
    nameProfile.textContent = data.name
    descriptionProfile.textContent = data.about
    document.querySelector('.profile__avatar').src = data.avatar
  })
  .catch((err) => {
    console.log(err) // выведем ошибку в консоль
  })

// Загрузка карточек с сервера
api.getInitialCards()
  .then((cards) => {
    renderCards(cards).renderItems()
  })
  .catch((err) => {
    console.log(err) // выведем ошибку в консоль
  })

// Изменение данных о пользователе
const handleUserInfo = function (userData) {
  api.patchUserInfo(userData.name, userData.about)
    .then((info) => {
      user.setUserInfo(info)
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })
}

// Добавление новой карточки на сервер
const addNewCard = function (card) {
  api.postNewCard(card.name, card.link)
    .then((card) => {
      const newPlaceCard = new Card (card, placeTemplate, handleCardClick)
      const placeElement = newPlaceCard.generateCard()
      renderCards().addNewCard(placeElement)
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })
}

const popupWithImage = new PopupWithImage(popupImage, imageInPopup, nameImageInPopup)

const handleCardClick = function (placeImage, placeName) {
  popupWithImage.open(placeImage, placeName)
  popupWithImage.setEventListeners()
}

// Отрисовка карточек
const renderCards = function (cards) {
  const cardsList = new Section({
      items: cards,
      renderer: (place) => {

        const newPlaceCard = new Card (place, placeTemplate, handleCardClick)
        const placeElement = newPlaceCard.generateCard()

        cardsList.addItem(placeElement)
      },
    },
    placeList
  )
  return cardsList
}

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile
})

// создадим экземпляры класса Popup для каждого попапа
const placePopup = new PopupWithForm(popupPlace, (place) => {
    addNewCard(place)
  })

const infoPopup = new PopupWithForm(popupInfo, handleUserInfo)

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
