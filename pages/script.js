const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeButton = popup.querySelector('.popup__close')
const form = popup.querySelector('.popup__form')

// Открытие и закрытие попапа

const popupToggle = function(event) {
  popup.classList.toggle('popup_opened')
}

const closePopup = function(event) {
  if (event.target !== event.currentTarget) { return }
  popupToggle()
}

editButton.addEventListener('click', popupToggle)
closeButton.addEventListener('click', popupToggle)
form.addEventListener('submit', popupToggle)
popup.addEventListener('click', closePopup)

// Изменение данных профиля

let nameInput = document.querySelector('.popup__input_name')
let descriptionInput = document.querySelector('.popup__input_description')
let nameProfile = document.querySelector('.profile__name')
let descriptionProfile = document.querySelector('.profile__description')

const formOpenPopup = function(event) {
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

editButton.addEventListener('click', formOpenPopup)

const formSubmitHandler = function(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
}

form.addEventListener('submit', formSubmitHandler)