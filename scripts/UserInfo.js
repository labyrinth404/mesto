export class UserInfo {
    constructor({userName, infUser}) {
        this.userName = userName;
        this.infUser = infUser;
    }

    getUserInfo() {
        return {user: document.querySelector(this.userName).textContent, 
                info: document.querySelector(this.infUser).textContent};
    }

    setUserInfo(newUserName, newInfUser) {
        document.querySelector(this.userName).textContent = newUserName;
        document.querySelector(this.infUser).textContent = newInfUser;
    }
}