
const popupEditProfile = document.querySelector('.popup_field_edit');

const formFieldEdit = document.querySelector('.form_field_edit');
const formFieldTextInputName = formFieldEdit.querySelector('.form__field-text_input_name')
const formFieldTextInputJob = formFieldEdit.querySelector('.form__field-text_input_job')

const popupAddCard = document.querySelector('.popup_field_add');

const formFieldAdd = document.querySelector('.form_field_add');

const titleAddInput = popupAddCard.querySelector('.form__field-text_input_title')
const linkAddInput = popupAddCard.querySelector('.form__field-text_input_link')

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const closButton = popupEditProfile.querySelector('.popup__close-button');
const addClosButton = popupAddCard.querySelector('.popup__close-button');

const editBox = document.querySelector('.profile__edit-button-box');

const addBox = document.querySelector('.profile__add-button-box');

const elements = document.querySelector('.elements');
const page = document.querySelector('.page');

const elementTemplateContent = document.getElementById('elemTemp').content

const popupImage = document.querySelector('.image-popup')

const popupImageCloseButton = popupImage.querySelector('.popup__close-button')


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
  elements.prepend(elementTemplateClone)
}

//Редактировать профиль
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formFieldTextInputName.value;
  profileStatus.textContent = formFieldTextInputJob.value;
  closePopup(popupEditProfile)
}

popupImageCloseButton.addEventListener('click', function () {
    closePopup(popupImage)
})

//Открыть добавление

function createCard(title, link) {
  const elementTemplateClone = elementTemplateContent.querySelector('.element').cloneNode(true);
  const elementTitle = elementTemplateClone.querySelector('.element__title')
  const imageLink = elementTemplateClone.querySelector('.element__image')
  elementTitle.textContent = title;
  imageLink.src = link

  //Лайк картинки
  elementTemplateClone.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  const image = elementTemplateClone.querySelector('.element__image');
  //Открытие картинки
  image.addEventListener('click', function () {
    // const closestImage = popupImage.closest('.element__image')
    // console.log(closestImage)
    popupImage.querySelector('.image-popup__image').src = image.src
    popupImage.querySelector('.image-popup__image').alt = "Изображение места"
    popupImage.querySelector('.image-popup__title').textContent = elementTitle.textContent
    openPopup(popupImage)
    //Закрытие картинки

  });

  //Удалить карточку
  const deleteButton = elementTemplateClone.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.element');
    card.remove();
  });

  return (elementTemplateClone)
}

//Добавить карточку
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  const elementTemplateClone = createCard(titleAddInput.value, linkAddInput.value)
  elements.prepend(elementTemplateClone)
  closePopup(popupAddCard)
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

formFieldEdit.addEventListener('submit', formEditProfileSubmitHandler);
editBox.addEventListener('click', function () { 
  openPopup(popupEditProfile)});
closButton.addEventListener('click', function () { closePopup(popupEditProfile) 
  formFieldTextInputName.value = profileName.textContent
  formFieldTextInputJob.value = profileStatus.textContent
});

addBox.addEventListener('click', function () { openPopup(popupAddCard)
  titleAddInput.value = ""
  linkAddInput.value = "" 
});
formFieldAdd.addEventListener('submit', formAddCardSubmitHandler);
addClosButton.addEventListener('click', function () { closePopup(popupAddCard) });
