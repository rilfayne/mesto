import { popupInfo, imageInPopup, nameImageInPopup, nameProfile, descriptionProfile, nameInput, descriptionInput } from "./constants.js";

const handleCardClick = function (popup) {
  popup.classList.add('popup_opened')
}

// Заполнение попапа Image

// const fillPopupImage = function(evt) {
//   imageInPopup.src = ''
//   imageInPopup.alt = ''
//   nameImageInPopup.textContent = ''
//
//   imageInPopup.src = evt.target.src
//   imageInPopup.alt = evt.target.alt
//   nameImageInPopup.textContent = evt.target.alt
// }

// Функция очистки формы

const resetForm = function(form) {
  form.reset()
}

// Изменение данных профиля через попап Info

const formSubmitHandler = function(evt) {
  evt.preventDefault()

  nameProfile.textContent = nameInput.value
  descriptionProfile.textContent = descriptionInput.value

  // togglePopup(popupInfo)
}

// Функция очистки ошибок при открытии попапа

const hideError = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'))
  const errorElement = Array.from(form.querySelectorAll('.popup__input-error'))

  inputList.forEach(input => {
    input.classList.remove('popup__input_type_error')
  })

  errorElement.forEach(error => {
    error.classList.remove('popup__input-error_active')
    error.textContent = ''
  })
}

// Функция, которая делает кнопку submit в попапе Info активной при открытии попапа

const resetButton = (popup) => {
  if (popup === popupInfo) {
    const submitButton = document.querySelector('.popup__button_type_info')
    submitButton.classList.remove('popup__button_inactive')
  }
  else {
    const submitButton = document.querySelector('.popup__button_type_place')
    submitButton.classList.add('popup__button_inactive')
  }
}

export { resetForm, formSubmitHandler, hideError, resetButton, handleCardClick }

