const popupInfo = document.querySelector('.popup_info')
const popupImage = document.querySelector('.popup_image')
const popupDel = document.querySelector('.popup_delete-card')
const imageInPopup = document.querySelector('.popup__image')
const nameImageInPopup = document.querySelector('.popup__image-name')
const nameProfile = document.querySelector('.profile__name')
const descriptionProfile = document.querySelector('.profile__description')
const nameInput = document.querySelector('.popup__input_name')
const descriptionInput = document.querySelector('.popup__input_description')

const editButton = document.querySelector('.profile__edit-button')
const popupPlace = document.querySelector('.popup_place')
const formInfo = document.querySelector('.popup__form_info')
const addButton = document.querySelector('.profile__add-button')
const formPlace = document.querySelector('.popup__form_place')
const placeTemplate = document.querySelector('.place-template').content
const placeList = document.querySelector('.places__list')

const settingsObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  errorSelector: '.popup__input-error'
}

export { popupInfo, popupImage, imageInPopup, nameImageInPopup, nameProfile, descriptionProfile, nameInput, descriptionInput,
  editButton, popupPlace, formInfo, addButton, formPlace, placeList, placeTemplate, settingsObject, popupDel }
