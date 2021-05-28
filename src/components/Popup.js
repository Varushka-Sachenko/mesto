export default class Popup {
    constructor (popupSelector){
        this._popupSelector = document.querySelector(popupSelector) 
        //this._handleEscClose = this._handleEscClose.bind(Popup)
    }
    open(){
        
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }

    close (){
        //console.log('close')
        this._popupSelector.classList.remove('popup_opened');
        //popupName.removeEventListener('click',  checkPopup);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(e){
        
        if (e.key === "Escape") {
            // popupName = document.querySelector('.popup_opened')
        
            this.close()
        }

    }

    setEventListeners(){
        this._popupSelector.querySelector('.popup__close-button').addEventListener('mousedown', (evt) => {
			this.close()
		})
        document.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
				this.close()
			}
        })
    }
}