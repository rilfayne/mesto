export default class FormValidator {
  constructor(settingsObject, formElement) {
    this._formElement = formElement;
    this._inputSelector = settingsObject.inputSelector;
    this._submitButtonSelector = settingsObject.submitButtonSelector;
    this._inactiveButtonClass = settingsObject.inactiveButtonClass;
    this._inputErrorClass = settingsObject.inputErrorClass;
    this._errorClass = settingsObject.errorClass;
    this._errorSelector = settingsObject.errorSelector;
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
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    // Вызовем функцию, чтобы кнопка была неактивной до ввода данных
    this._toggleButtonState(inputList)
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, чтобы проверять валидность поля
        this._isValid(inputElement)
        // Вызовем toggleButtonState, который отвечает за состояние кнопки
        this._toggleButtonState(inputList)
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
      // Обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid
    })
  }

// Метод, который отключает и включает кнопку submit при вводе данных в форму
  _toggleButtonState (inputList) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделать кнопку неактивной
      this._inactiveSubmit()
    } else {
      // иначе сделать кнопку активной
      this._activeSubmit()
    }
  }

  // Метод, который отвечает за состояние кнопки submit при открытии попапа
  resetButton () {
    if (this._buttonElement.classList.contains('popup__button_type_info')) {
      this._activeSubmit()
    }
    else {
      this._inactiveSubmit()
    }
  }

  // Метод, который делает кнопку submit неактивной
  _inactiveSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
  }

  // Метод, который делает кнопку submit активной
  _activeSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
  }

  // Метод, который очищает ошибки при открытии попапа
  hideError () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const errorElement = Array.from(this._formElement.querySelectorAll(this._errorSelector))

    inputList.forEach(input => {
      input.classList.remove(this._inputErrorClass)
    })

    errorElement.forEach(error => {
      error.classList.remove(this._errorClass)
      error.textContent = ''
    })
  }
}
