
let all_edit = document.querySelector('.popup_field_edit');

let formEdit = document.querySelector('.form_field_edit');
let nameInput = formEdit.querySelector('.form__field-text_input_name')
let jobInput = formEdit.querySelector('.form__field-text_input_job')

let all_add = document.querySelector('.popup_field_add');

let formAdd = document.querySelector('.form_field_add');
let titleInput = formAdd.querySelector('.form__field-text_input_title')
let linkInput = formAdd.querySelector('.form__field-text_input_link')


// Выберите элементы, куда должны быть вставлены значения полей
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__status');

let closButton = all_edit.querySelector('.popup__close-button');
let addClosButton = all_add.querySelector('.popup__close-button');

let edit = document.querySelector('.profile__edit-button-box');

let add = document.querySelector('.profile__add-button-box');

let elements = document.querySelector('.elements');
let page = document.querySelector('.page');


let elTempCont = document.getElementById('elemTemp').content

let imagePopup = document.getElementById('imagePopup').content

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }];

//Добавление начальных карточек
for (i in initialCards) {

  let elTemp = elTempCont.querySelector('.element').cloneNode(true);
  let title = elTemp.querySelector('.element__title')
  let imgLink = elTemp.querySelector('.element__image')
  // console.log(initialCards[i].name)
  title.textContent = initialCards[i].name
  //console.log(initialCards[i].name)
  //console.log(title)
  imgLink.src = initialCards[i].link

  elTemp.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // выберем кнопку удаления
  const deleteButton = elTemp.querySelector('.element__delete-button');
  // добавим обработчик
  deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.element');
    card.remove();
  });

  const image = elTemp.querySelector('.element__image');
  //Открытие картинки
  image.addEventListener('click', function () {
    let locImagePopup = imagePopup.querySelector('.image-popup').cloneNode(true);
    closIm = image.closest('.element__image')

    closTit = elTemp.querySelector('.element__title')
    locImagePopup.querySelector('.image-popup__image').src = closIm.src
    locImagePopup.querySelector('.image-popup__title').textContent = closTit.textContent

    page.append(locImagePopup)
    locImagePopup.classList.add('popup_opened')
    //Закрытие картинки
    const closeBut = locImagePopup.querySelector('.popup__close-button')
    closeBut.addEventListener('click', function () {
      //console.log(locImagePopup)
      locImagePopup.classList.remove('popup_opened')
    })

  });



  elements.prepend(elTemp)
}

// Открыть редактирование профиля
function editPopupOpened() {
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  all_edit.classList.add('popup_opened');

}

//Закрыть редактирование
function editIsClose() {
  all_edit.classList.remove('popup_opened');
}

//Редактировать профиль
function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  editIsClose()
}

//Открыть добавление
function addPopupOpened() {
  title = titleInput.value
  link = linkInput.value
  all_add.classList.add('popup_opened');
}

//Закрыть добавление
function addIsClose() {
  all_add.classList.remove('popup_opened');
  title = titleInput.value
  link = linkInput.value
}

//Добавить карточку
function addSubmitHandler(evt) {
  evt.preventDefault();

  let elTemp = document.getElementById('elemTemp')
  let elTempCont = elTemp.content;
  let title = elTempCont.querySelector('.element__title')
  let imgLink = elTempCont.querySelector('.element__image')

  titleFill = titleInput.value;
  title.textContent = titleFill;

  link = linkInput.value;
  imgLink.src = link
  elTempCont.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
    console.log('like')
  });

  const deleteButton = elTempCont.querySelector('.element__delete-button');
  // добавим обработчик
  deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.element');
    card.remove();
  });

  const image = elTempCont.querySelector('.element__image');
  //Открытие картинки
  image.addEventListener('click', function () {
    let locImagePopup = imagePopup.querySelector('.image-popup').cloneNode(true);
    
    let closIm = image.closest('.element__image')
    locImagePopup.querySelector('.image-popup__image').src = closIm.src
    locImagePopup.querySelector('.image-popup__title').textContent = title.textContent

    page.append(locImagePopup)
    locImagePopup.classList.add('popup_opened')
    //Закрытие картинки
    const closeBut = locImagePopup.querySelector('.popup__close-button')
    closeBut.addEventListener('click', function () {
      //console.log(locImagePopup)
      locImagePopup.classList.remove('popup_opened')
    })

  });
  

  elements.prepend(elTempCont)
  addIsClose()
}

//Удалить карточку
function deletElem() {
  print(123245)
  const card = deletButton.closest('.element');
  card.remove();
}

let deletButton = elements.querySelector('.element__delete-button');
deletButton.addEventListener('click', function (evt) {
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули
  const eventTarget = evt.target;
  console.log(eventTarget)
});




formEdit.addEventListener('submit', formSubmitHandler);
edit.addEventListener('click', editPopupOpened);
closButton.addEventListener('click', editIsClose);

add.addEventListener('click', addPopupOpened);
formAdd.addEventListener('submit', addSubmitHandler);
addClosButton.addEventListener('click', addIsClose);
