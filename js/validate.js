// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(errorClass)
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement,inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
  } 
  else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

// Функция, которая добавляет слушатели всем полям формы
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorElement, addButton, editButton, submitPlace, submitInfo) => {
  // Находим все поля внутри формы, и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector)
  const buttonAdd = document.querySelector(addButton)
  const buttonEdit = document.querySelector(editButton)
  // Вызовем функцию, чтобы кнопка была неактивной до ввода данных
    toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, inputErrorClass, errorClass)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass)
    })
  }) 
  // листенеры для очистки ошибок и обнуления кнопки при открытии форм
  buttonAdd.addEventListener('click', (evt) => {
    hideError(formElement, inputList, errorElement, inputErrorClass, errorClass)
    resetButton(evt, inactiveButtonClass, buttonEdit, submitPlace, submitInfo)
  })
  buttonEdit.addEventListener('click', (evt) => {
    hideError(formElement, inputList, errorElement, inputErrorClass, errorClass)
    resetButton(evt, inactiveButtonClass, buttonEdit, submitPlace, submitInfo)
  })
}

// Функция, которая добавляет слушатели всем формам на странице
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorElement, addButton, editButton, submitPlace, submitInfo}) => {
  // Найдём все формы с указанным классом в DOM и сделаем из них массив
  const formList = Array.from(document.querySelectorAll(formSelector))

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault()
    })

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorElement, addButton, editButton, submitPlace, submitInfo)
  })
}

// Функция. которая проверяет все поля формы на валидность

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid
  })
}

// Функция, которая отключает и включает кнопку при вводе данных в форму

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделать кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass)
  } else {
    // иначе сделать кнопку активной
    buttonElement.classList.remove(inactiveButtonClass)
  }
}

// Функция очистки ошибок при открытии попапа

const hideError = (formElement, inputList, errorElement, inputErrorClass, errorClass) => {
  const errorList = Array.from(formElement.querySelectorAll(errorElement))

  inputList.forEach(input => {
    input.classList.remove(inputErrorClass)
  })

  errorList.forEach(error => {
    error.classList.remove(errorClass)
    error.textContent = ''
  })
}

// Функция, которая делает кнопку submit в попапе Info активной при открытии попапа

const resetButton = (evt, inactiveButtonClass, buttonEdit, submitPlace, submitInfo) => {
  if (evt.target === buttonEdit) {
    const submitInfoButton = document.querySelector(submitInfo)
    submitInfoButton.classList.remove(inactiveButtonClass)
  }
  else {
    const submitPlaceButton = document.querySelector(submitPlace)
    submitPlaceButton.classList.add(inactiveButtonClass)
  }
}

// Вызов функции

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  errorElement: '.popup__input-error',
  addButton: '.profile__add-button',
  editButton: '.profile__edit-button',
  submitInfo: '.popup__button_type_info',
  submitPlace: '.popup__button_type_place'
})