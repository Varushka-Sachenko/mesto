export default class Popup {
    constructor (popupSelector){
        this._popupSelector = popupSelector
    }
    open(){
        this._popupSelector.classList.add('popup_opened');
        //this._popupSelector.addEventListener('click',  checkPopup);
        document.addEventListener('keydown',  _handleEscClose(evt));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        //popupName.removeEventListener('click',  checkPopup);
        document.removeEventListener('keydown', _handleEscClose(evt));

    }

    _handleEscClose(evt){
        if (evt.key === "Escape") {
            // popupName = document.querySelector('.popup_opened')
            close(document.querySelector('.popup_opened'))
        }

    }

    setEventListeners(){
        this._popupSelector.addEventListener('mousedown', (evt) => {
			if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
				this.close()
			}
		})
    }
}