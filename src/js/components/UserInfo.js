//отвечает за управление отображением информации о пользователе на странице

import {descriptionInput, nameInput } from '../utils/constants.js'

export default class UserInfo {
  constructor({name, description}) {
    this._name = name;
    this._description = description;
  }

  // метод, который подставляет данные пользователя в форму при открытии
  getUserInfo() {
    nameInput.value = this._name.textContent
    descriptionInput.value = this._description.textContent
  }

  // метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._name.textContent = nameInput.value
    this._description.textContent = descriptionInput.value
  }
}
