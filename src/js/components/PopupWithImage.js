import Popup from './Popup.js'
import {imageInPopup, nameImageInPopup} from "../utils/constants.js"

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup)
  }

  open(evt) {
    super.open()
    imageInPopup.src = ''
    imageInPopup.alt = ''
    nameImageInPopup.textContent = ''

    imageInPopup.src = evt.target.src
    imageInPopup.alt = evt.target.alt
    nameImageInPopup.textContent = evt.target.alt
  }
}
