
import Popup from "./Popup.js";


export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popupElement.querySelector('.form')
        
        // this._newSubmit = newSubmit
        // this._userId = userId
    }

    changeSubmit(newSubmit) {
        // console.log(newSubmit)
        this._handleFormSubmit = newSubmit;
    }


    setEventListeners() {
		super.setEventListeners()
       // console.log(this._popupElement)
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault()
            // console.log(this)
            this._handleFormSubmit(this.card)
		})
	}
}