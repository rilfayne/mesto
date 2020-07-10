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
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

// Функция, которая добавляет слушатели всем полям формы
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Находим все поля внутри формы, и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector)
  // Вызовем функцию, чтобы кнопка была неактивной до ввода данных

  if (formElement !== formInfo) {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  }

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
}

// Функция, которая добавляет слушатели всем формам на странице
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  // Найдём все формы с указанным классом в DOM и сделаем из них массив
  const formList = Array.from(document.querySelectorAll(formSelector))

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault()
    })

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
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

// Функция, которая отключает и включает кнопку

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

// Вызовем функцию

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
})