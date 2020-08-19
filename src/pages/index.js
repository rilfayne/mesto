import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
// import { initialCards } from '../utils/mocks.js'
import { popupInfo, nameProfile, editButton, popupPlace, formInfo, addButton, formPlace, placeTemplate, placeList, settingsObject,
  descriptionProfile, popupImage, imageInPopup, nameImageInPopup, nameInput, descriptionInput } from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'a443eb38-3b02-4168-b5e2-cad025c42c56',
    'Content-Type': 'application/json'
  }
})


function loadData() {
  api.getUserInfo()
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then((data) => {
      nameProfile.textContent = data.name
      descriptionProfile.textContent = data.about
      document.querySelector('.profile__avatar').src = data.avatar
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })

  api.getInitialCards()
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((data) => {
      cardsFromServer(data)
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })

}

function handleUserInfo () {
  api.patchUserInfo(nameInput, descriptionInput)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((info) => {
      user.setUserInfo(info)
    })
}


const popupWithImage = new PopupWithImage(popupImage, imageInPopup, nameImageInPopup)

const handleCardClick = function (placeImage, placeName) {
  popupWithImage.open(placeImage, placeName)
  popupWithImage.setEventListeners()
}

const cardsFromServer = function (data) {
  const cardsList = new Section({
      items: data,
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
}

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile
})

// создадим экземпляры класса Popup для каждого попапа
const placePopup = new PopupWithForm(popupPlace, (place) => {

  // Создаем экземпляр класса Card
  const newPlaceCard = new Card (place, placeTemplate, handleCardClick)
  // const placeElement = newPlaceCard.generateCard()


  // cardsList.addItem(placeElement)
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

loadData()
