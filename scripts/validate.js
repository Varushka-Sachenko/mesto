const enableValidation = (classes) => {

    const setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
        const buttonElement = formElement.querySelector(classes.submitButtonSelector);

        // чтобы проверить состояние кнопки в самом начале
        toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement);
                // чтобы проверять его при изменении любого из полей
                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // span
        inputElement.classList.add(classes.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(classes.errorClass);
    };


    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);// span
        console.log(inputElement)
        inputElement.classList.remove(classes.inputErrorClass);
        errorElement.classList.remove(classes.errorClass);
        errorElement.textContent = '';
    };

    const checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    };

    const toggleButtonState = (inputList, buttonElement) => {
        // Если есть хотя бы один невалидный инпут
        if (hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            buttonElement.classList.add(classes.inactiveButtonClass);
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.remove(classes.inactiveButtonClass);
        }
    };

    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            // console.log(inputElement, !inputElement.validity.valid)

            return !inputElement.validity.valid;
        });
    }
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from

    const formList = Array.from(document.querySelectorAll(classes.formSelector));
    // console.log(formList)
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });

};

