// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active')
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error_active')
  errorElement.textContent = ''
}

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement)
  }
}

// Функция, которая добавляет слушатели всем полям формы
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__button')
  // Вызовем функцию, чтобы кнопка была неактивной до ввода данных
  // toggleButtonState(inputList, buttonElement)

  if (formElement !== formInfo) {
    toggleButtonState(inputList, buttonElement)
  }

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement)
    })
  })
}

// Функция, которая добавляет слушатели всем формам на странице
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM и сделаем из них массив
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault()
    })

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement)
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

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделать кнопку неактивной
    buttonElement.classList.add('popup__button_inactive')
  } else {
    // иначе сделать кнопку активной
    buttonElement.classList.remove('popup__button_inactive')
  }
}

// Вызовем функцию
// enableValidation()

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})