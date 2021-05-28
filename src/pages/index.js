import Card from '../components/Card.js'
import {initialCards} from '../components/initialCards.js'
import {FormValidator} from '../components/FormValidator.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import userInfo from '../components/UserInfo.js'

import './index.css';
import Avatar from '../images/Avatar.svg';


const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Avatar', image: Avatar },
]; 

const popupEditProfile = new Popup('.popup_field_edit');

const formFieldEdit = new PopupWithForm('.popup_field_edit', formEditProfileSubmitHandler);
const formFieldTextInputName = document.querySelector('.form__field-text_input_name')
const formFieldTextInputJob = document.querySelector('.form__field-text_input_job')

const popupAddCard = new Popup('.popup_field_add');

const formFieldAdd = new PopupWithForm('.popup_field_add', formAddCardSubmitHandler);

const editBox = document.querySelector('.profile__edit-button-box');

const addBox = document.querySelector('.profile__add-button-box');

const elements = document.querySelector('.elements');
const page = document.querySelector('.page');

const elementTemplateContent = document.getElementById('elemTemp').content

const popupImage = new PopupWithImage('.image-popup')

const profileName = document.querySelector('.profile__name')
const profileStatus = document.querySelector('.profile__status')
//const popupImageCloseButton = popupImage.querySelector('.popup__close-button')

//const titlePopupImage = popupImage.querySelector('.image-popup__title')

const profileInfo = new userInfo({
  nameSelector:'.profile__name', 
  infoSelector:'.profile__status'})

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

popupImage.setEventListeners ()
popupEditProfile.setEventListeners ()
popupAddCard.setEventListeners()

formFieldEdit.setEventListeners()
formFieldAdd.setEventListeners()


function cardImageClick (link, title){
  popupImage.open(link, title)
}


//Редактировать профиль
function formEditProfileSubmitHandler(data) {
  profileInfo.setUserInfo(data)
  popupEditProfile.close()
}

// popupImageCloseButton.addEventListener('click', function () {
//   closePopup(popupImage)
// })

//Открыть добавление

function createCard(title, src) {
	const card = new Card({ title, src }, '.template', cardImageClick)
	const cardElement= card.generateCard()
	return cardElement
}

//Добавить карточку
function formAddCardSubmitHandler(data) {
  //console.log(data)
  elements.prepend(createCard(data.title, data.link))
  formFieldAdd.close()
}




//formFieldEdit.addEventListener('submit', formEditProfileSubmitHandler);

editBox.addEventListener('click', function () {

  formFieldTextInputName.value = profileInfo.getUserInfo().name
  formFieldTextInputJob.value = profileInfo.getUserInfo().info
  popupEditProfile.open()
  
});


addBox.addEventListener('click', function () {
  popupAddCard.open()
  // titleAddInput.value = ""
  // linkAddInput.value = ""
  validationAdd.makeInactive()
});

//formFieldAdd.addEventListener('submit', formAddCardSubmitHandler);

const editForm = document.querySelector('.form_field_edit')
const addForm = document.querySelector('.form_field_add')

const validationEdit = new FormValidator(validationConfig, editForm)
validationEdit.enableValidation()

const validationAdd = new FormValidator(validationConfig, addForm)
validationAdd.enableValidation()