export class FormValidator {
    constructor(classes, formElement){
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

    _hideInputError(formElement, inputElement)  {
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

    _toggleButtonState (inputList, buttonElement) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _hasInvalidInput (inputList){
        return inputList.some((inputElement) => {
            // console.log(inputElement, !inputElement.validity.valid)

            return !inputElement.validity.valid;
        });
    }
    

    _setEventListeners (formElement) {

        // чтобы проверить состояние кнопки в самом начале
        
        this._toggleButtonState(this._inputList,this._buttonElement);

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
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from

    
    // console.log(_formList)
    // Переберём полученную коллекцию

    // allSetEventListeners
    // this._formList.forEach((formElement) => {
    //     formElement.addEventListener('submit', (evt) => {
    //         // У каждой формы отменим стандартное поведение
    //         evt.preventDefault();
    //     });
    //     // Для каждой формы вызовем функцию setEventListeners,
    //     // передав ей элемент формы
    //     setEventListeners(formElement);
    // });
}

// export const enableValidation = (classes) => {

//     const setEventListeners = (formElement) => {
//         const this._inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
//         const this._buttonElement = formElement.querySelector(classes.submitButtonSelector);

//         // чтобы проверить состояние кнопки в самом начале
//         toggleButtonState(this._inputList, this._buttonElement);

//         this._inputList.forEach((inputElement) => {
//             inputElement.addEventListener('input', function () {
//                 checkInputValidity(formElement, inputElement);
//                 // чтобы проверять его при изменении любого из полей
//                 toggleButtonState(this._inputList, this._buttonElement);
//             });
//         });
//     };

//     const showInputError = (formElement, inputElement, errorMessage) => {
//         const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // span
//         inputElement.classList.add(this._inputErrorClass);
//         errorElement.textContent = errorMessage;
//         errorElement.classList.add(this._errorClass);
//     };


//     const hideInputError = (formElement, inputElement) => {
//         const errorElement = formElement.querySelector(`.${inputElement.id}-error`);// span
        
//         inputElement.classList.remove(this._inputErrorClass);
//         errorElement.classList.remove(this._errorClass);
//         errorElement.textContent = '';
//     };

//     const checkInputValidity = (formElement, inputElement) => {
//         if (!inputElement.validity.valid) {
//             showInputError(formElement, inputElement, inputElement.validationMessage);
//         } else {
//             hideInputError(formElement, inputElement);
//         }
//     };

//     const toggleButtonState = (this._inputList, this._buttonElement) => {
//         // Если есть хотя бы один невалидный инпут
//         if (hasInvalidInput(this._inputList)) {
//             // сделай кнопку неактивной
//             this._buttonElement.classList.add(this._inactiveButtonClass);
//         } else {
//             // иначе сделай кнопку активной
//             this._buttonElement.classList.remove(this._inactiveButtonClass);
//         }
//     };

//     const hasInvalidInput = (this._inputList) => {
//         return this._inputList.some((inputElement) => {
//             // console.log(inputElement, !inputElement.validity.valid)

//             return !inputElement.validity.valid;
//         });
//     }
//     // Найдём все формы с указанным классом в DOM,
//     // сделаем из них массив методом Array.from

//     const _formList = Array.from(document.querySelectorAll(classes.formSelector));
//     // console.log(_formList)
//     // Переберём полученную коллекцию
//     _formList.forEach((formElement) => {
//         formElement.addEventListener('submit', (evt) => {
//             // У каждой формы отменим стандартное поведение
//             evt.preventDefault();
//         });
//         // Для каждой формы вызовем функцию setEventListeners,
//         // передав ей элемент формы
//         setEventListeners(formElement);
//     });

// };

