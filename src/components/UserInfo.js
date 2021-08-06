export class UserInfo {
    #userName;
    #userInfo;
    #userAvatar;
    constructor({ userName, userInfo, userAvatar }) {
        this.#userName = document.querySelector(userName);
        this.#userInfo = document.querySelector(userInfo);
        this.#userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        
        return {user: this.#userName.textContent, 
                info: this.#userInfo.textContent,
                avatar: this.#userAvatar.src};
    }

    setUserInfo(newUserName, newUserInfo, newUserAvatar) {
        this.#userName.textContent = newUserName;
        this.#userInfo.textContent = newUserInfo;
        this.#userAvatar.src = newUserAvatar;
    }
}