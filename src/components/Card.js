import PopupDeleteCard from './PopupDeleteCard.js'
import Api from './Api.js'
class Card {  
	constructor(data, cardSelector, openPopup, deleteCard, classApi) { 
	    this._title = data.name;    
	    this._link = data.link;    
		this._cardId = data._id
		this._owner = data.owner._id
		this._cardSelector = cardSelector;  
		this.openPopup = openPopup
		this._classApi = classApi
		this._cardLikes = data.likes
		this._deleteCard = deleteCard
		this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
		this._deleteButton = this._element.querySelector('.element__delete-button')
		this._likeButton = this._element.querySelector('.element__like-button')
	}



	generateCard() {
		
		this._setEventListeners();
		const cardImage = this._element.querySelector('.element__image');
		const counter = this._element.querySelector('.element__like-count');
		cardImage.src = this._link;
		cardImage.alt = "Изображение " + this._title;
		counter.textContent = this._cardLikes.length
		this._element.querySelector('.element__title').textContent = this._title;

		if (this._cardLikes.includes(this._owner)){
			this._likeButton.classList.add('element__like-button_active');
				
		}
		this._classApi.loadUserInfo()
		.then((result) => {
			if (this._owner === result._id){
	
				this._deleteButton.classList.add('element__delete-button_visible')
			}
		})
		.catch((err) => {
		console.log(err); // выведем ошибку в консоль
		});
		
  
		return this._element
	}

	_likeCard (){
		if (this._cardLikes.includes(this._owner)){
			this._likeButton.classList.remove('element__like-button_active');
			this._classApi.unlikeCard(this._cardId)
			
		} else {
			this._classApi.likeCard(this._cardId)
			this._likeButton.classList.add('element__like-button_active');
		}
		
	}

	_deleteCard(cardId){
		
		this._classApi.deleteCard(cardId)
	}

	_openImage(){
		
		const popupImage = document.querySelector('.image-popup')
		const imagePopupImage = popupImage.querySelector('.image-popup__image')
		const titlePopupImage = popupImage.querySelector('.image-popup__title')
		imagePopupImage.src = this._link
		imagePopupImage.alt = "Изображение " + this._title;

		titlePopupImage.textContent = this._title
		//console.log(this.openPopup)
		this.openPopup(this._link, this._title)
	}


	_setEventListeners() {
		
		
		this._deleteButton.addEventListener('click', (evt) => {
			const popupDeleteCard = new PopupDeleteCard('.popup_delete-card', this._deleteCard, this._cardId);
			popupDeleteCard.open()
			popupDeleteCard.setEventListeners()

			
		});
  
		
		this._likeButton.addEventListener('click', () => {
			this._likeCard ()
		});
		
		this._element.querySelector('.element__image').addEventListener('click', () => {
			
			this._openImage()
			
		});
	  }
	//здесь будут другие методы
}

export default Card

