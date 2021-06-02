
import Popup from "./Popup.js";


export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleFormSubmit, cardId, adress, token, card){
        super(popupSelector)
        this._adress = adress
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popupElement.querySelector('.form')
        this._cardId = cardId
        this._token = token
        this._card = card
    }


    setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault()
			this._handleFormSubmit(this._cardId, this._card)
            this.close()
		})
	}
}