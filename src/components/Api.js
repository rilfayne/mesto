export default class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  // getInitialCards() {
  //   return fetch(`${this.url}cards`, {
  //     headers: {
  //       authorization: this.headers.authorization
  //     }
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //
  //       // если ошибка, отклоняем промис
  //       return Promise.reject(`Ошибка: ${res.status}`)
  //     })
  //     .catch((err) => {
  //       console.log(err) // выведем ошибку в консоль
  //     })
  // }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
  }


}
