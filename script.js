

// Находим форму в DOM
// Воспользуйтесь методом querySelector()
let all = document.querySelector('.content');
let formElement = document.querySelector('.form__fields');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__name')// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.form__job')// Воспользуйтесь инструментом .querySelector()
let save = formElement.querySelector('.form__save-button');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let username = nameInput.value;
    let status = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__status');
    // Вставьте новые значения с помощью textContent
    name.textContent = username;
    job.textContent = status;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

let clos = all.querySelector('.form__close-button');
let edit = document.querySelector('.profile__edit-button-box');

function popup_opened (){
    all.classList.add('content_opened');
}

function is_close (){
    all.classList.remove('content_opened');
}

edit.addEventListener('click', popup_opened); 
clos.addEventListener('click', is_close); 