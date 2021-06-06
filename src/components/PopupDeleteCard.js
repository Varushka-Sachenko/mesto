
import Popup from "./Popup.js";


export default class PopupDeleteCard extends Popup{
    constructor(popupSelector, handleFormSubmit, cardId, card, classApi){
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit.bind(classApi)
        this._form = this._popupElement.querySelector('.form')
        this._cardId = cardId
        this._card = card
        // this._userId = userId
    }


    setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault()
			this._handleFormSubmit(this._cardId)
            .then(res=>{
                this._card._element.remove()
            })
            this.close()
		})
	}
}