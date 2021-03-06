export default class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => this._getResponseData(res))
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => this._getResponseData(res))
  }

  patchUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._getResponseData(res))
  }

  postNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res))
  }

  putlike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => this._getResponseData(res))
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => this._getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => this._getResponseData(res))
  }

  patchAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._getResponseData(res))
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }


}
