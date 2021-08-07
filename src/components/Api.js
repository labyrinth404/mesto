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

    #checkResponse(res){
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
  
    getInitialCards() {
        return fetch(`${this.#url}/cards`, {
            headers: this.#headers
          })
            .then(this.#checkResponse);
    }

    postCard(name, link){
        this.#name = name;
        this.#link = link;
        this.#headers['Content-Type'] = 'application/json';
        return fetch(`${this.#url}/cards`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({
                "name": this.#name,
                "link": this.#link
                })
            })
            .then(this.#checkResponse);
    }

    deleteCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/${this.#cardId}`, {
            method: 'DELETE',
            headers: this.#headers
            })
            .then(this.#checkResponse);

    }

    getUserInfo(){
        return fetch(`${this.#url}/users/me `, {
            headers: this.#headers
            })
            .then(this.#checkResponse);
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
        .then(this.#checkResponse);
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
        .then(this.#checkResponse);
    }

    changeLikeCard(cardId, like){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/likes/${this.#cardId}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers
        })
        .then(this.#checkResponse);
    }
}