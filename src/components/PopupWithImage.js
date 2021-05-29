import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector)
	}

    open(link, title) {
		super.open()
		//console.log('open')
		const popupImage = this._popupElement.querySelector('.image-popup__image')
		popupImage.src = link
        popupImage.alt = "Изображение" + title
        const popupImageTitle = this._popupElement.querySelector('.image-popup__title')
        popupImageTitle.textContent = title
	}
}