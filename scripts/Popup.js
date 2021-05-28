export default class Popup {
    constructor (popupSelector){
        this._popupSelector = document.querySelector(popupSelector) 
        //this._handleEscClose = this._handleEscClose.bind()
    }
    open(){
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close = () => {
        //console.log('esc')
        this._popupSelector.classList.remove('popup_opened');
        //popupName.removeEventListener('click',  checkPopup);
        document.removeEventListener('keyup', this._handleEscClose);

    }

    _handleEscClose(e){
        //console.log(e.key)
        if (e.key === "Escape") {
            // popupName = document.querySelector('.popup_opened')
            //console.log(this)
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