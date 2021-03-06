export class FormValidator {
    constructor(classes, formElement) {
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(classes.inputSelector));
        this._buttonElement = this._formElement.querySelector(classes.submitButtonSelector);
        this._formList = Array.from(document.querySelectorAll(classes.formSelector));
        this._inputErrorClass = classes.inputErrorClass
        this._errorClass = classes.errorClass
        this._inactiveButtonClass = classes.inactiveButtonClass
        this._setEventListeners = this._setEventListeners.bind(this)
    }



    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // span
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);// span

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    makeInactive(){
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(this._inputList)) {
            // сделай кнопку неактивной
            this.makeInactive()
            this._buttonElement.disabled = true
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            // console.log(inputElement, !inputElement.validity.valid)

            return !inputElement.validity.valid;
        });
    }


    _setEventListeners() {

        // чтобы проверить состояние кнопки в самом начале

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {

            inputElement.addEventListener('input', () => {

                this._toggleButtonState();
                this._checkInputValidity(inputElement);
                // чтобы проверять его при изменении любого из полей

            });
        });
    };

    enableValidation() {
        this._setEventListeners(this._formElement)
    }
}

