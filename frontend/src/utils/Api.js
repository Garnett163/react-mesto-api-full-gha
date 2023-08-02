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

  getUserInfo(token) {
    return this._sendFetchRequest(`users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  editUserInfo(userInfo, token) {
    return this._sendFetchRequest(`users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    });
  }

  getInitialCards(token) {
    return this._sendFetchRequest(`cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addNewCard(card, token) {
    return this._sendFetchRequest(`cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  changeAvatar(data, token) {
    return this._sendFetchRequest(`users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  deleteCard(cardId, token) {
    return this._sendFetchRequest(`cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (!isLiked) {
      return this.likeCard(cardId, token);
    } else {
      return this.dislikeCard(cardId, token);
    }
  }

  likeCard(cardId, token) {
    return this._sendFetchRequest(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  dislikeCard(cardId, token) {
    return this._sendFetchRequest(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});
