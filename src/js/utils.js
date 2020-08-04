const popupInfo = document.querySelector('.popup_info')
const popupImage = document.querySelector('.popup_image')
const imageInPopup = document.querySelector('.popup__image')
const nameImageInPopup = document.querySelector('.popup__image-name')
const nameProfile = document.querySelector('.profile__name')
const descriptionProfile = document.querySelector('.profile__description')
const nameInput = document.querySelector('.popup__input_name')
const descriptionInput = document.querySelector('.popup__input_description')

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

// Заполнение попапа Image

const fillPopupImage = function(evt) {
  imageInPopup.src = ''
  imageInPopup.alt = ''
  nameImageInPopup.textContent = ''

  imageInPopup.src = evt.target.src
  imageInPopup.alt = evt.target.alt
  nameImageInPopup.textContent = evt.target.alt
}

// Функция очистки формы

const resetForm = function(form) {
  form.reset()
}

// Изменение данных профиля через попап Info

const formSubmitHandler = function(evt) {
  evt.preventDefault()

  nameProfile.textContent = nameInput.value
  descriptionProfile.textContent = descriptionInput.value

  togglePopup(popupInfo)
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

export { popupInfo, popupImage, nameProfile, descriptionProfile, nameInput, descriptionInput, togglePopup, fillPopupImage, resetForm, formSubmitHandler, hideError, resetButton }

