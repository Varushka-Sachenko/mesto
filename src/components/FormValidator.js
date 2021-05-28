export class FormValidator {
    constructor(classes, formElement) {
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(classes.inputSelector));
        this._buttonElement = this._formElement.querySelector(classes.submitButtonSelector);
        this._formList = Array.from(document.querySelectorAll(classes.formSelector));
        this._inputErrorClass = classes.inputErrorClass
        this._errorClass = classes.errorClass
        this._inactiveButtonClass = classes.inactiveButtonClass

    }



    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // span
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);// span

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    makeInactive(){
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    _toggleButtonState(inputList, buttonElement) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            this.makeInactive()
            this._buttonElement.disabled = true
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            // console.log(inputElement, !inputElement.validity.valid)

            return !inputElement.validity.valid;
        });
    }


    _setEventListeners(formElement) {

        // чтобы проверить состояние кнопки в самом начале

        this._toggleButtonState(this._inputList, this._buttonElement);

        this._inputList.forEach((inputElement) => {

            inputElement.addEventListener('input', () => {

                this._toggleButtonState(this._inputList, this._buttonElement);
                this._checkInputValidity(this._formElement, inputElement);
                // чтобы проверять его при изменении любого из полей

            });
        });
    };

    enableValidation() {
        this._setEventListeners(this._formElement)
    }
}

