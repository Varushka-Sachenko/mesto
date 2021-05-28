class Card {  
	constructor(data, cardSelector, openPopup) { 
	    this._title = data.title;    
	    this._link = data.src;    
		this._cardSelector = cardSelector;  
		this.openPopup = openPopup
	}



	generateCard() {
		this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
		this._setEventListeners();
		const cardImage = this._element.querySelector('.element__image');
		cardImage.src = this._link;
		cardImage.alt = "Изображение " + this._title;
		this._element.querySelector('.element__title').textContent = this._title;
		//console.log(this._title)
  
		return this._element
	}

	_likeCard (evt){
		evt.target.classList.toggle('element__like-button_active');
	}

	_deleteCard(evt){
		const card = evt.target.closest('.element');
     	card.remove();
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
		
		this._deleteButton = this._element.querySelector('.element__delete-button')
		this._deleteButton.addEventListener('click', (evt) => {
			this._deleteCard(evt)
		});
  
		this._likeButton = this._element.querySelector('.element__like-button')
		this._likeButton.addEventListener('click', (evt) => {
			this._likeCard (evt)
		});
		
		this._element.querySelector('.element__image').addEventListener('click', () => {
			
			this._openImage()
			
		});
	  }
	//здесь будут другие методы
}

export default Card

