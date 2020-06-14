const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeButton = popup.querySelector('.popup__close')
const form = popup.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__input_name')
let descriptionInput = document.querySelector('.popup__input_description')
let nameProfile = document.querySelector('.profile__name')
let descriptionProfile = document.querySelector('.profile__description')

// Открытие и закрытие попапа

const popupToggle = function(event) {
  popup.classList.toggle('popup_opened') // добавляем или убираем класс попапу

  if (event.target === editButton) {
  nameInput.value = nameProfile.textContent; // заполняем графу name
  descriptionInput.value = descriptionProfile.textContent; // заполняем графу description
  }
}

// закрытие попапа по клику на полупрозрачный фон
const closePopup = function(event) {
  if (event.target !== event.currentTarget) { return } 
  popupToggle(event)
}

// Изменение данных профиля

const formSubmitHandler = function(event) {
  event.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  popupToggle(event) // закрываем окно
}

editButton.addEventListener('click', popupToggle)
closeButton.addEventListener('click', popupToggle)
popup.addEventListener('click', closePopup)
form.addEventListener('submit', formSubmitHandler)