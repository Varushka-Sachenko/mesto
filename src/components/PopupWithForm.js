import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector)
		this._handleFormSubmit = handleFormSubmit
		this._form = this._popupSelector.querySelector('.form')
		this._inputs = this._form.querySelectorAll('.form__field-text')
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
			this._handleFormSubmit(this._getInputValues())
		})
	}

	close () {
		
		
		this._form.reset()
		//console.log(super.close)
		super.close()
		
	}
}