import { BASE_URL } from "./auth";

class Api {
  constructor(url) {
    this._url = url;
    this._token = localStorage.getItem('token');
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
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
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  patchProfile({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteLike(id)  {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked? 'PUT' : 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  patchAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }
};

export const api = new Api({ BASE_URL });
//export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-59','96da67be-193e-4896-a588-48f1d36951e6');