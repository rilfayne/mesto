import Popup from './Popup.js'

export default class PopupForDeleteCard extends Popup {
  constructor(popup, api) {
    super(popup);
    this._api = api;
  }

  setEventListeners(cardId) {
    super.setEventListeners()
    const okButton = this._popup.querySelector('.popup__button')
    okButton.addEventListener('click', () => {
      this._delClickHandler(cardId)
      this.close()
    })
  }

  _delClickHandler(cardId) {
    this._api.delCard(cardId)
      .then(res => {
        const card = document.getElementById(cardId)
        card.remove()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
