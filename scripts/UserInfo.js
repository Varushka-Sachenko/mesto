export default class UserInfo {
    constructor ({nameSelector, infoSelector}){
        this._nameSelector = nameSelector
        this._infoSelector = infoSelector
    }

    getUserInfo (){
        //console.log(this._nameSelector)
        const userName = document.querySelector(this._nameSelector).textContent
        const userInfo = document.querySelector(this._infoSelector).textContent

        
        const userData = {
            name: userName,
            info: userInfo,
        }
        //console.log(userData)
        return (userData)
    }

    setUserInfo (userData){
        //console.log(document.querySelector('.profile__name'))
        document.querySelector('.profile__name').textContent = userData.name;
        document.querySelector('.profile__status').textContent  = userData.info;
    }
}