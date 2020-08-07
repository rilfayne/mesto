export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened')

    document.addEventListener('keyup', (evt) => this._handleEscClose(evt))
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', (evt) => this._handleEscClose(evt))
  }

  // Закрытие попапа по клику на Esc
  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close()
      }
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close')
    // закрытие попапа по клику на крестик
    this._closeButton.addEventListener('mousedown', () => {
      this.close()
    })
    // закрытие попапа по клику на оверлей
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target !== evt.currentTarget) { return }
      this.close()
    })
  }
}
