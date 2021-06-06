




import Card from '../components/Card.js'
//import {initialCards} from '../components/initialCards.js'
import {FormValidator} from '../components/FormValidator.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import userInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupDeleteCard from '../components/PopupDeleteCard.js'

import './index.css';
import Avatar from '../images/Avatar.svg';


const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', addNewAvatar)
const profileAvatar = document.querySelector('.profile__avatar')
//console.log(popupEditAvatar)
const formFieldEdit = new PopupWithForm('.popup_field_edit', editProfileSubmitHandler);
const formFieldTextInputName = document.querySelector('.form__field-text_input_name')
const formFieldTextInputJob = document.querySelector('.form__field-text_input_job')

const profileAvatarContainer = document.querySelector('.profile__avatar-container')
//const formFieldAdd = new Popup('.popup_field_add');

const formFieldAdd = new PopupWithForm('.popup_field_add', addCardSubmitHandler);

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button-box');

const buttonOpenPopupAddCard = document.querySelector('.profile__add-button-box');

let elements = document.querySelector('.elements');
const page = document.querySelector('.page');

const elementTemplateContent = document.getElementById('elemTemp').content



const profileName = document.querySelector('.profile__name')
const profileStatus = document.querySelector('.profile__status')
//const popupImageCloseButton = popupImage.querySelector('.popup__close-button')

//const titlePopupImage = popupImage.querySelector('.image-popup__title')


const profileInfo = new userInfo('.profile__name', '.profile__status', '.profile__avatar')


const classApi = new Api ({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-24/cards',
  token: 'a94d4dc8-3936-43d8-a3b5-2773303eb737'
})


const additionCards = new Section({ 
  renderer: createCard,}, '.elements')



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
const formDeleteCard = document.querySelector('.form_field_delete')
const validationEdit = new FormValidator(validationConfig, formEditProfile)


const validationAdd = new FormValidator(validationConfig, formAddCard)
const validationDelete = new FormValidator(validationConfig, formDeleteCard)


// index.js
let userId;
//let userData

Promise.all([classApi.loadUserInfo(), classApi.getInitialCards()])
  .then(([userData, cards]) => {
    // console.log([userData, cards])
    userId = userData._id;
    additionCards.drawAllCards(cards);
    profileInfo.setUserInfo(userData);
    profileInfo.setNewAvatar(userData.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

function clickCardImage (link, title){
  popupImage.open(link, title)
}

function openImagePopup (link, title){
  const popupImage = new PopupWithImage('.image-popup')
  popupImage.open(link, title)
  popupImage.setEventListeners()

}

//Редактировать профиль
function editProfileSubmitHandler(data) {
  classApi.editProfileINfo(data)
  .then((result) => {
    profileInfo.setUserInfo(result);
    formFieldEdit.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
  
}

function addNewAvatar (data) {
  classApi.changeAvatar(data.avatar)
  .then((result) => {
    // console.log(result)
    profileInfo.setNewAvatar(result.avatar);
    popupEditAvatar.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
  
}

//Открыть добавление


function deleteThisCard (cardId, card){
  const popupDeleteCard = new PopupDeleteCard('.popup_delete-card', classApi.deleteCard, cardId, card, classApi);
  popupDeleteCard.open()
  popupDeleteCard.setEventListeners()
  // classApi.deleteCard(cardId)
}

function likeThisCard (card) {
  
  if(card.isLiked()) {
    
    classApi.unlikeCard(this.getCardId())
      .then(data => card.setLikesInfo(data))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    // console.log('like')
    classApi.likeCard(this.getCardId())
      .then(data => card.setLikesInfo(data))
      .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }
}


function createCard(data) {
	const card = new Card(data, '.template', clickCardImage, deleteThisCard, userId, likeThisCard, openImagePopup)
	const cardElement= card.generateCard()
	return cardElement
}

//Добавить карточку
function addCardSubmitHandler(data) {
  classApi.addNewCard(data)
    .then((result) => {
      const newCard = createCard(result);
      additionCards.addItem(newCard);
      formFieldAdd.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
} 


popupEditAvatar.setEventListeners()

formFieldEdit.setEventListeners()
formFieldAdd.setEventListeners()

profileAvatarContainer.addEventListener('click', function () {
  popupEditAvatar.open()
  validationDelete.makeInactive()
})

profileAvatarContainer.addEventListener('mouseover', function () {
  document.querySelector('.profile__avatar-overlay').classList.add('profile__avatar-overlay_visible')
})

profileAvatarContainer.addEventListener('mouseout', function () {
  document.querySelector('.profile__avatar-overlay').classList.remove('profile__avatar-overlay_visible')
})
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