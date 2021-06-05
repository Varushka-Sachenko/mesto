
import Popup from "./Popup.js";


export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleFormSubmit, cardId, card){
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popupElement.querySelector('.form')
        this._cardId = cardId
        this._card = card
    }


    setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault()
			this._handleFormSubmit(this._cardId)
            .then(res=>{
                //console.log(this._card._element)
                this._card._element.remove()
            })
            this.close()
		})
	}
}