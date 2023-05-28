class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.token;
  }

  _checkResponse(res) {
    {if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
 
  getUserInfo = () => {
    return fetch(this._baseUrl + "/users/me", {
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._checkResponse);
  };

  getImages = () => {
    return fetch(this._baseUrl + "/cards", {
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
    .then(this._checkResponse);
  };

  addCard = (data) => {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(this._checkResponse);
  };

  deleteCard = (_id) => {
    return fetch(this._baseUrl + "/cards/" + _id, {
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "DELETE",
    })
    .then(this._checkResponse);
  };

  editProfile = (data) => {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._checkResponse);
  };

  putLike(_id) {
    return fetch(this._baseUrl + "/cards/likes/" + _id, {
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "PUT",
    }).then((this._checkResponse));
  }

  deleteLike(_id) {
    return fetch(this._baseUrl + "/cards/likes/" + _id, {
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "DELETE",
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._checkResponse);
  }

  editAvatar = (data) => {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: 
      {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(this._checkResponse);
  };
}

 const api = new Api({
  baseUrl: "https://api.praktikum.mesto.nomoredomains.monster",
  headers:
    {'Content-Type': 'application/json'},
});
export default api 
