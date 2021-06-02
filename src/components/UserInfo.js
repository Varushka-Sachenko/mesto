export default class UserInfo {
    constructor (nameSelector, infoSelector, avatarLink){
        this._nameSelector = nameSelector
        this._infoSelector = infoSelector
        this._avatarLink = avatarLink
    }

    getUserInfo (){
        //console.log(this._nameSelector)
        const userName = document.querySelector(this._nameSelector).textContent
        const userInfo = document.querySelector(this._infoSelector).textContent
        const avatar = document.querySelector('.profile__avatar')
        
        const userData = {
            name: userName,
            info: userInfo,
        }
        //console.log(userData)
        return (userData)
    }

    setNewAvatar(link){
        const avatar = document.querySelector('.profile__avatar')
        avatar.src = link
    }

    setUserInfo (userData){
        //console.log(document.querySelector('.profile__name'))
        document.querySelector('.profile__name').textContent = userData.name;
        document.querySelector('.profile__status').textContent  = userData.info;
    }
}