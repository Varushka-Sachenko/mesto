
let all = document.querySelector('.popup');
let formElement = document.querySelector('.form');

let nameInput = formElement.querySelector('.form__field-text_name')
let jobInput = formElement.querySelector('.form__field-text_job')



// Выберите элементы, куда должны быть вставлены значения полей
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__status');

let closButton = all.querySelector('.form__close-button');
let edit = document.querySelector('.profile__edit-button-box');

function popupOpened() {
    nameInput.value = name.innerText
    console.log(name.innerText);
    jobInput.value = job.innerText
    console.log(job.innerText);
    all.classList.add('popup_opened');

}

function isClose() {
    all.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    isClose()
}




formElement.addEventListener('submit', formSubmitHandler);
edit.addEventListener('click', popupOpened);
closButton.addEventListener('click', isClose);