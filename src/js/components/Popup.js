export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened')

    // this._popup.addEventListener('mousedown', closePopupOutside)
    this._setEventListeners()
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt))
  }


  close() {
    this._popup.classList.remove('popup_opened')

    // this._popup.removeEventListener('mousedown', closePopupOutside)
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close()
      }
  }

  _setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close')
    this._closeButton.addEventListener('mousedown', () => {
      this.close()
    })
  }
}
