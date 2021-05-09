import Card from './Card.js'
import {initialCards} from './initialCards.js'
import {FormValidator} from './FormValidator.js'

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

const closeEditProfileBtn = popupEditProfile.querySelector('.popup__close-button');
const addCloseButton = popupAddCard.querySelector('.popup__close-button');

const editBox = document.querySelector('.profile__edit-button-box');

const addBox = document.querySelector('.profile__add-button-box');

const elements = document.querySelector('.elements');
const page = document.querySelector('.page');

const elementTemplateContent = document.getElementById('elemTemp').content

const popupImage = document.querySelector('.image-popup')

const popupImageCloseButton = popupImage.querySelector('.popup__close-button')

const titlePopupImage = popupImage.querySelector('.image-popup__title')

// const popup = document.querySelector('.popup_field_edit');

//Добавление начальных карточек
initialCards.forEach( function (item, i, arr) {
//console.log(initialCards[i].name)
  elements.prepend(createCard(initialCards[i].name, initialCards[i].link))
  
})

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__field-text',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__field-text_error',
    errorClass: 'form__input-error_active'
} 


function handleESC(evt) {
    if (evt.key == "Escape") {

      // popupName = document.querySelector('.popup_opened')
      closePopup(document.querySelector('.popup_opened'))
    }
} 

function checkPopup (e){
  
    if (e.target.className.indexOf('popup ') !== -1) {
      // popupName = 
      closePopup(document.querySelector('.popup_opened'))
    }
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

function createCard(title, src) {
	const card = new Card({ title, src }, '.template', openPopup)
	const cardElement= card.generateCard()
	return cardElement
}

//Добавить карточку
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  // const elementTemplateClone = createCard(titleAddInput.value, linkAddInput.value)
  elements.prepend(createCard(titleAddInput.value, linkAddInput.value))
  closePopup(popupAddCard)
}

function openPopup(popupName) {
  
  popupName.classList.add('popup_opened');
  popupName.addEventListener('click',  checkPopup);
  document.addEventListener('keydown',  handleESC); 
  
  if (popupName.querySelector('.form')){
    //console.log(popupName.querySelector('.form'))
    const validation = new FormValidator(validationConfig, popupName.querySelector('.form'))
    validation.enableValidation()
  }
}


function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  popupName.removeEventListener('click',  checkPopup);
  document.removeEventListener('keydown',  handleESC); 
}



formFieldEdit.addEventListener('submit', formEditProfileSubmitHandler);
editBox.addEventListener('click', function () {

  formFieldTextInputName.value = profileName.textContent
  formFieldTextInputJob.value = profileStatus.textContent
  openPopup(popupEditProfile)
});
closeEditProfileBtn.addEventListener('click', function () {
  closePopup(popupEditProfile)
});

addBox.addEventListener('click', function () {
  openPopup(popupAddCard)
  titleAddInput.value = ""
  linkAddInput.value = ""
  popupAddCard.querySelector('.form__save-button').classList.add(validationConfig.inactiveButtonClass)
});

formFieldAdd.addEventListener('submit', formAddCardSubmitHandler);
addCloseButton.addEventListener('click', function () { 
  closePopup(popupAddCard) 

});