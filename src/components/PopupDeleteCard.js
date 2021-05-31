
import Popup from "./Popup.js";


export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleFormSubmit, cardId){
        super(popupSelector)
        
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popupElement.querySelector('.form')
        this._cardId = cardId
    }


    setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault()
            
			this._handleFormSubmit(this._cardId)
            this.close()
		})
	}
}