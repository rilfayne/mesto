import Popup from './Popup.js'
import { formPlace } from '../utils/constants.js'

export default class PopupWithForm extends Popup {
  constructor(popup, submitHandler) {
    super(popup);
    this._form = popup.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
      this._submitHandler()
  }

  setEventListeners() {
    super.setEventListeners()
  // закрытие попапа при сабмите
    const submitButton = this._form.querySelector('.popup__button')
    this._form.addEventListener('submit', () => {
      if (submitButton.classList.contains('popup__button_inactive')) { return false }
      else {
        this._getInputValues()
        this.close()
      }
    })
  }

  close() {
    super.close()
  //при закрытии попапа форма должна ещё и сбрасываться
    if (this._form === formPlace) {
      this._form.reset()
    }
  }
}
