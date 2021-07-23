export class UserInfo {
    #userName;
    #userInfo;
    constructor({ userName, userInfo }) {
        this.#userName = document.querySelector(userName);
        this.#userInfo = document.querySelector(userInfo);
    }

    getUserInfo() {
        
        return {user: this.#userName.textContent, 
                info: this.#userInfo.textContent};
    }

    setUserInfo(newUserName, newUserInfo) {
        this.#userName.textContent = newUserName;
        this.#userInfo.textContent = newUserInfo;
    }
}