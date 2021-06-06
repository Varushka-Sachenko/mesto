import PopupDeleteCard from './PopupDeleteCard.js'
class Card {  
	constructor(data, cardSelector, openPopup, deleteCard, userId, likeCard, handleCardClick) { 
	    this._title = data.name; 
		this._likeCard = likeCard   
	    this._link = data.link;    
		this._cardId = data._id
		this._owner = data.owner._id
		this._handleCardClick = handleCardClick;
		this._cardSelector = cardSelector;  
		this.openPopup = openPopup
		this._userId = userId;
		this._cardLikes = data.likes
		this._deleteCard = deleteCard
		this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
		this._deleteButton = this._element.querySelector('.element__delete-button')
		this._likeButton = this._element.querySelector('.element__like-button')
	}



	generateCard() {
		
		this._setEventListeners();
		const cardImage = this._element.querySelector('.element__image');
		this._counter = this._element.querySelector('.element__like-count');
		cardImage.src = this._link;
		cardImage.alt = "Изображение " + this._title;
		this._counter.textContent = this._cardLikes.length
		this._element.querySelector('.element__title').textContent = this._title;

		if (this.isLiked()){
			this._likeButton.classList.add('element__like-button_active');
				
		}
		if(this._owner === this._userId) {
			this._deleteButton.classList.add('element__delete-button_visible');
		}
		
  
		return this._element
	}

	getCardId() {
		return this._cardId;
	} 

	isLiked() {
		// console.log(this._cardLikes)
		return this._cardLikes.some(item => item._id === this._owner);
	} 

	setLikesInfo(data) {
		// console.log(data)
		this._cardLikes = data.likes;
		this._counter.textContent = data.likes.length;
		this._likeButton.classList.toggle('element__like-button_active');
	} 


	_setEventListeners() {
		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handleCardClick(this._link, this._title);
		});
		
		
		this._deleteButton.addEventListener('click', (evt) => {
			const card = evt.target.closest('.element')
			this._deleteCard(this._cardId, this)

		});
  
		
		this._likeButton.addEventListener('click', () => {
			this._likeCard (this)
		});
		
		this._element.querySelector('.element__image').addEventListener('click', () => {
			
			this._handleCardClick(this._link, this._title)
			
		});
	  }
	//здесь будут другие методы
}

export default Card

