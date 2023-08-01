class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendFetchRequest(path, settings) {
    return fetch(`${this._baseUrl}${path}`, settings).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._sendFetchRequest(`users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo(userInfo) {
    return this._sendFetchRequest(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    });
  }

  getInitialCards() {
    return this._sendFetchRequest(`cards`, {
      headers: this._headers,
    });
  }

  addNewCard(card) {
    return this._sendFetchRequest(`cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  changeAvatar(data) {
    return this._sendFetchRequest(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  deleteCard(cardId) {
    return this._sendFetchRequest(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  }

  likeCard(cardId) {
    return this._sendFetchRequest(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  dislikeCard(cardId) {
    return this._sendFetchRequest(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:4000/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});
