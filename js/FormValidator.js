import { popupInfo } from './index.js'

class FormValidator {
  constructor(settingsObject, formElement) {
    this._formElement = formElement;
    this._inputSelector = settingsObject.inputSelector;
    this._submitButtonSelector = settingsObject.submitButtonSelector;
    this._inactiveButtonClass = settingsObject.inactiveButtonClass;
    this._inputErrorClass = settingsObject.inputErrorClass;
    this._errorClass = settingsObject.errorClass;
  }

  // Метод, который добавляет класс с ошибкой
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  // Метод, который удаляет класс с ошибкой
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  // Метод, который проверяет валидность поля
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement)
    }
  }

  // Метод, который добавляет слушатели всем полям формы
  _setEventListeners () {
    // Находим все поля внутри формы, и сделаем из них массив
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    // Вызовем функцию, чтобы кнопка была неактивной до ввода данных
    this._toggleButtonState(inputList, buttonElement)
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, чтобы проверять валидность поля
        this._isValid(inputElement)
        // Вызовем toggleButtonState, который отвечает за состояние кнопки
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  // Метод, который добавляет слушатель форме
  enableValidation () {
    // Создадим слушатель на submit формы
    this._formElement.addEventListener('submit', (evt) => {
      // Отменим стандартное поведение формы
      evt.preventDefault()
    })

    this._setEventListeners()
  }

  // Метод, который проверяет все поля формы на валидность
  _hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
      return !inputElement.validity.valid
    })
  }

// Метод, который отключает и включает кнопку при вводе данных в форму
  _toggleButtonState (inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделать кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass)
    } else {
      // иначе сделать кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass)
    }
  }

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

export { resetButton, hideError, FormValidator }
