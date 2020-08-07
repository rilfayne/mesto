// Класс, который отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  // метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameValue, descriptionValue) {
    this._name.textContent = nameValue.value
    this._description.textContent = descriptionValue.value
  }
}
