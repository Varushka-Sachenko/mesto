
export default class Api {


  constructor({adress, token}){
      this.adress = adress
      this._token = token
  }

  getInitialCards() {
      return fetch(this.adress, {
        headers: {
          authorization: this._token
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  loadUserInfo(){
      return fetch('https://nomoreparties.co/v1/cohort-24/users/me', {
          headers: {
          authorization: this._token
        }
      }) 
      .then(res => {
          if (res.ok) {
            return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res =>{
        this._owner = res
        return res
      });
  }

  editProfileINfo(data){
      //console.log(data)
      fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me', {
      method: 'PATCH',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: data.name,
          about: data.info,
      })
  })
  }

  addNewCard(data){
      fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards', {
      method: 'POST',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: data.title,
          link: data.link,
      })
      })
      const owner = this._owner
      //console.log(owner)
      return owner
  }


  deleteCard(cardId, card){
      fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
    })
    card.remove()
  }


  likeCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
    },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  }

  unlikeCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
    },})
    .then(res => {
      if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  }    

  changeAvatar(link){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-24/users/me/${link}`, {
    method: 'PATCH',
    headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link,
  })})

  }
}