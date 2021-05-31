import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector)
		this._handleFormSubmit = handleFormSubmit
		this._form = this._popupElement.querySelector('.form')
		this._inputs = this._form.querySelectorAll('.form__field-text')
		this._saveButton = this._popupElement.querySelector('.form__save-button')
	}

	_getInputValues() {
		const inputValues = {}
		this._inputs.forEach(input => {
			inputValues[input.name] = input.value
		})
		
		return inputValues
	}

	setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault()
			//console.log(this._saveButton.textContent)
			this._saveButton.textContent = "Сохранение..."
			this._handleFormSubmit(this._getInputValues())
		})
	}

	close () {
		
		
		this._form.reset()
		this._saveButton.textContent = "Сохранить"
		//console.log(super.close)
		super.close()
		
	}
}