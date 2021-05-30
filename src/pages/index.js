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

//const formFieldEdit = new Popup('.popup_field_edit');

const formFieldEdit = new PopupWithForm('.popup_field_edit', editProfileSubmitHandler);
const formFieldTextInputName = document.querySelector('.form__field-text_input_name')
const formFieldTextInputJob = document.querySelector('.form__field-text_input_job')

//const formFieldAdd = new Popup('.popup_field_add');

const formFieldAdd = new PopupWithForm('.popup_field_add', addCardSubmitHandler);

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button-box');

const buttonOpenPopupAddCard = document.querySelector('.profile__add-button-box');

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
  infoSelector:'.profile__status'
})

const additionCards = new Section({
  items:initialCards, 
  renderer: createCard,}, '.elements')
additionCards.drawAllCards()

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__field-text',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__field-text_error',
    errorClass: 'form__input-error_active'
} 

const formEditProfile = document.querySelector('.form_field_edit')
const formAddCard = document.querySelector('.form_field_add')

const validationEdit = new FormValidator(validationConfig, formEditProfile)


const validationAdd = new FormValidator(validationConfig, formAddCard)



function clickCardImage (link, title){
  popupImage.open(link, title)
}


//Редактировать профиль
function editProfileSubmitHandler(data) {
  profileInfo.setUserInfo(data)
  formFieldEdit.close()
}


//Открыть добавление

function createCard(title, src) {
	const card = new Card({ title, src }, '.template', clickCardImage)
	const cardElement= card.generateCard()
	return cardElement
}

//Добавить карточку
function addCardSubmitHandler(data) {
  //console.log(data)
  additionCards.addItem(createCard(data.title, data.link))
  
  formFieldAdd.close()
}

popupImage.setEventListeners ()


formFieldEdit.setEventListeners()
formFieldAdd.setEventListeners()


//formFieldEdit.addEventListener('submit', editProfileSubmitHandler);

buttonOpenPopupEditProfile.addEventListener('click', function () {

  formFieldTextInputName.value = profileInfo.getUserInfo().name
  formFieldTextInputJob.value = profileInfo.getUserInfo().info
  formFieldEdit.open()
  
});


buttonOpenPopupAddCard.addEventListener('click', function () {
  formFieldAdd.open()
  // titleAddInput.value = ""
  // linkAddInput.value = ""
  validationAdd.makeInactive()
});

//formFieldAdd.addEventListener('submit', addCardSubmitHandler);


validationAdd.enableValidation()
validationEdit.enableValidation()