




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

const popupImage = new PopupWithImage('.image-popup')

const profileName = document.querySelector('.profile__name')
const profileStatus = document.querySelector('.profile__status')
//const popupImageCloseButton = popupImage.querySelector('.popup__close-button')

//const titlePopupImage = popupImage.querySelector('.image-popup__title')


const profileInfo = new userInfo('.profile__name', '.profile__status',profileAvatar.src)


const classApi = new Api ({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-24/cards',
  token: 'a94d4dc8-3936-43d8-a3b5-2773303eb737'
})


const additionCards = new Section({ 
  renderer: createCard,}, '.elements')

classApi.getInitialCards()
  .then((result) => {
    additionCards.drawAllCards(result)
    //console.log(cards)
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
});
//console.log(cards)
changeUserInfo()
function changeUserInfo(){
  classApi.loadUserInfo()
.then((result) => {
  
  profileName.textContent = result.name
  profileStatus.textContent = result.about
  profileAvatar.src = result.avatar
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

}


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

function clickCardImage (link, title){
  popupImage.open(link, title)
}


//Редактировать профиль
function editProfileSubmitHandler(data) {
  classApi.editProfileINfo(data)
  changeUserInfo()
  profileInfo.setUserInfo(data)
  formFieldEdit.close()
}

function addNewAvatar (data) {
  classApi.changeAvatar(data.avatar)
  profileInfo.setNewAvatar(data.avatar)
  popupEditAvatar.close()
}

//Открыть добавление


function deleteThisCard (cardId, card){
  const popupDeleteCard = new PopupDeleteCard('.popup_delete-card', classApi.deleteCard, cardId, 'https://mesto.nomoreparties.co/v1/cohort-24/cards', 'a94d4dc8-3936-43d8-a3b5-2773303eb737', card);
  popupDeleteCard.open()
  popupDeleteCard.setEventListeners()
  // classApi.deleteCard(cardId)
}
function likeThisCard (cardId){
  
		if (this._cardLikes.some(item => item._id === this._owner)){
			this._likeButton.classList.remove('element__like-button_active');
			classApi.unlikeCard(this._cardId)
      .then((result) => {
        //console.log(result)
        this._counter.textContent = result.likes.length
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
      
			//this._counter.textContent = this._cardLikes.length - 1
			
		} else {
			classApi.likeCard(this._cardId)
      .then((result) => {
        this._counter.textContent = result.likes.length
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
			this._likeButton.classList.add('element__like-button_active');
		}
    //console.log(this._cardLikes)
}

function createCard(data) {
	const card = new Card(data, '.template', clickCardImage, deleteThisCard, classApi, likeThisCard)
	const cardElement= card.generateCard()
	return cardElement
}

//Добавить карточку
function addCardSubmitHandler(data) {
  const owner = classApi.addNewCard(data)
  classApi.getInitialCards()
  .then((result) => {
    for (let i=0; i<result.length; ++i){
      
      if(result[i].owner._id === owner._id){
        additionCards.addItem(createCard(result[i]))
        break
      }
      
    }
    
    //console.log(cards)
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
});
  
  formFieldAdd.close()
}

popupImage.setEventListeners ()
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