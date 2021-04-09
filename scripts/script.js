

const allEditPopup = document.querySelector('.popup_field_edit');

const formFieldEdit = document.querySelector('.form_field_edit');
const formFieldTextInputName = formFieldEdit.querySelector('.form__field-text_input_name')
const formFieldTextInputJob = formFieldEdit.querySelector('.form__field-text_input_job')

const allAddPopup = document.querySelector('.popup_field_add');

const formFieldAdd = document.querySelector('.form_field_add');

const titleAddInput = allAddPopup.querySelector('.form__field-text_input_title')
const linkAddInput = allAddPopup.querySelector('.form__field-text_input_link')


// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const closButton = allEditPopup.querySelector('.popup__close-button');
const addClosButton = allAddPopup.querySelector('.popup__close-button');

const editBox = document.querySelector('.profile__edit-button-box');

const addBox = document.querySelector('.profile__add-button-box');

const elements = document.querySelector('.elements');
const page = document.querySelector('.page');


const elementTemplateContent = document.getElementById('elemTemp').content

const imagePopup = document.getElementById('imagePopup').content


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

  elementTemplateClone = createCard(initialCards[i].name, initialCards[i].link)

  elementTemplateClone.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // выберем кнопку удаления
  const deleteButton = elementTemplateClone.querySelector('.element__delete-button');
  // добавим обработчик
  deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.element');
    card.remove();
  });

  const image = elementTemplateClone.querySelector('.element__image');
  //Открытие картинки
  image.addEventListener('click', function () {
    const locImagePopup = imagePopup.querySelector('.image-popup').cloneNode(true);
    closestImage = image.closest('.element__image')

    closTit = elementTemplateClone.querySelector('.element__title')
    locImagePopup.querySelector('.image-popup__image').src = closestImage.src
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



  elements.prepend(elementTemplateClone)
}




//Редактировать профиль
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formFieldTextInputName.value;
  profileStatus.textContent = formFieldTextInputJob.value;
  closePopup(allEditPopup, formFieldTextInputName, formFieldTextInputJob)
}

//Открыть добавление

function createCard(title, link) {
  const elementTemplateClone = elementTemplateContent.querySelector('.element').cloneNode(true);
  const elementTitle = elementTemplateClone.querySelector('.element__title')
  const imageLink = elementTemplateClone.querySelector('.element__image')
  elementTitle.textContent = title;
  imageLink.src = link
  return (elementTemplateClone)
}


//Добавить карточку
function addSubmitHandler(evt) {
  evt.preventDefault();


  const elementTemplateClone = createCard(titleAddInput.value, linkAddInput.value)

  // Лайк картинки
  elementTemplateClone.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });


  const image = elementTemplateClone.querySelector('.element__image');
  //Открытие картинки
  image.addEventListener('click', function () {
    const locImagePopup = imagePopup.querySelector('.image-popup').cloneNode(true);

    const closestImage = image.closest('.element__image')
    locImagePopup.querySelector('.image-popup__image').src = closestImage.src
    locImagePopup.querySelector('.image-popup__title').textContent = elementTitle.textContent

    page.append(locImagePopup)
    locImagePopup.classList.add('popup_opened')
    //Закрытие картинки
    const closeBut = locImagePopup.querySelector('.popup__close-button')
    closeBut.addEventListener('click', function () {
      //console.log(locImagePopup)
      locImagePopup.classList.remove('popup_opened')
    })

  });

  //Удалить карточку
  const deleteButton = elementTemplateClone.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.element');
    card.remove();
    console
  });

  elements.prepend(elementTemplateClone)
  closePopup(allAddPopup, titleAddInput, linkAddInput)
}


function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}


function closePopup(popupName, field1, field2) {
  popupName.classList.remove('popup_opened');
  field1.value = ""
  field2.value = ""
}


formFieldEdit.addEventListener('submit', formSubmitHandler);
editBox.addEventListener('click', function () { openPopup(allEditPopup) });
closButton.addEventListener('click', function () { closePopup(allEditPopup, formFieldTextInputName, formFieldTextInputJob) });

addBox.addEventListener('click', function () { openPopup(allAddPopup) });
formFieldAdd.addEventListener('submit', addSubmitHandler);
addClosButton.addEventListener('click', function () { closePopup(allAddPopup, titleAddInput, linkAddInput) });
