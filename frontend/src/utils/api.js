import { BASE_URL } from "./auth";

class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  };

  _checkHeaders = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`;
    return this._headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  handleGetUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  patchProfile({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._checkHeaders(),
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }

  postNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }

  handleDeleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  deleteLike(id)  {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked? 'PUT' : 'DELETE',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  patchAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._checkHeaders(),
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }
};

export const api = new Api( {
  url: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});
//export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-59','96da67be-193e-4896-a588-48f1d36951e6');