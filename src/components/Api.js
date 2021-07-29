export class Api {
    #url
    #headers
    constructor(options) {
        this.#url = options.url;
        this.#headers = options.headers
    }
  
    getInitialCards() {
        return fetch(this.#url, {
            method: 'GET',
            header: this.#headers
        }).then((res) => {
            return res.json();
        })
        .then((result) => {console.log(result)})
        .catch((err) => {
            alert(err);
        })
    }

    postCard(){

    }

    deleteCard(){

    }

    getUserInfo(){

    }

    patchUserInfo(){

    }

    patchUserAvatar(){

    }

    putLikeCard(){

    }

    deleteLikeCard(){

    }

  }