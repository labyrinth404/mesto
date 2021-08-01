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
            .catch(error => {console.log(error)})
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
            .then(res => res.json())
            .catch(error => {console.log(error)})
    }

    deleteCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/${this.#cardId}`, {
            method: 'DELETE',
            headers: this.#headers
            })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
            })
            .catch(error => {console.log(error)})

    }

    getUserInfo(){
        return fetch(`${this.#url}/users/me `, {
            headers: this.#headers
            })
            .then(res => res.json())
            .catch(error => {console.log(error)})
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
            .catch(error => {console.log(error)})
        }); 
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
            .catch(error => {console.log(error)})
        });
    }

    putLikeCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/likes/${this.#cardId}`, {
            method: 'PUT',
            headers: this.#headers
        })
        .catch(error => {console.log(error)})
    }

    deleteLikeCard(cardId){
        this.#cardId = cardId;
        return fetch(`${this.#url}/cards/likes/${this.#cardId}`, {
            method: 'DELETE',
            headers: this.#headers
        })
        .catch(error => {console.log(error)})
    }
}