export class UserInfo {
    #userName;
    #userInfo;
    constructor({ userName, userInfo }) {
        this.#userName = userName;
        this.#userInfo = userInfo;
    }

    getUserInfo() {
        
        return {user: document.querySelector(this.#userName).textContent, 
                info: document.querySelector(this.#userInfo).textContent};
    }

    setUserInfo(newUserName, newUserInfo) {
        document.querySelector(this.#userName).textContent = newUserName;
        document.querySelector(this.#userInfo).textContent = newUserInfo;
    }
}