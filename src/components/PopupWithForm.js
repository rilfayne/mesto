import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, submitHandler) {
    super(popup);
    this._form = popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._formValues = {}

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
  // закрытие попапа при сабмите
    const submitButton = this._form.querySelector('.popup__button')
    this._form.addEventListener('submit', (evt) => {
      if (submitButton.classList.contains('popup__button_inactive')) { return false }
      else {
        evt.preventDefault()
        this._submitHandler(this._getInputValues())
        this.close()
      }
    })
  }

  close() {
    super.close()
  //при закрытии попапа форма должна сбрасываться
    this._form.reset()
  }
}
