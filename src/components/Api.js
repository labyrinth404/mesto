export class Api {
    #url
    #headers
    #name
    #about
    #link
    #cardId
    #avatar
    constructor(options) {
        this.#url = options.url;
        this.#headers = options.headers;
    }
  
    getInitialCards() {
        return fetch(`${this.#url}/cards`, {
            headers: this.#headers
          })
            .then((res) => {      
                if (res.ok) {
                 return res.json();
              }})
    }

    postCard(name, link){
        this.#name = name;
        this.#link = link;
        this.#headers['Content-Type'] = 'application/json';
        fetch(`${this.#url}/cards`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({
                "name": this.#name,
                "link": this.#link
                })
            })
            .then(res => res.json());
    }

    deleteCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/${this.#cardId}`, {
            method: 'DELETE',
            headers: this.#headers
            })
            .then(res => res.json());

    }

    getUserInfo(){
        return fetch(`${this.#url}/users/me `, {
            headers: this.#headers
            })
            .then(res => res.json());
    }

    patchUserInfo(name, about){
        this.#name = name;
        this.#about = about;
        this.#headers['Content-Type'] = 'application/json';
        return fetch(`${this.#url}/users/me `, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                name: this.#name,
                about: this.#about
            })
        })
        .then((res) => console.log(res));
    }

    patchUserAvatar(avatar){
        this.#avatar = avatar;
        this.#headers['Content-Type'] = 'application/json';
        return fetch(`${this.#url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                avatar: this.#avatar
            })
        })
        .then(res => res.json());
    }

    putLikeCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/likes/${this.#cardId}`, {
            method: 'PUT',
            headers: this.#headers
        })
        .then((res) => console.log(res))
    }

    deleteLikeCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/likes/${this.#cardId}`, {
            method: 'DELETE',
            headers: this.#headers
        })
        .then((res) => console.log(res))
    }
}