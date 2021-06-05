import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector)
		this._popupImageTitle = this._popupElement.querySelector('.image-popup__title')
		this._popupImage = this._popupElement.querySelector('.image-popup__image')
	}

    open(link, title) {
		super.open()
		//console.log('open')
		this._popupImage.src = link
        this._popupImage.alt = "Изображение" + title
        this._popupImageTitle.textContent = title
	}
}