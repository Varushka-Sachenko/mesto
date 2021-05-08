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

	_setEventListeners() {
		const deleteButton = this._element.querySelector('.element__delete-button')
		deleteButton.addEventListener('click', (evt) => {
			const card = deleteButton.closest('.element');
     		card.remove();
		});
  
		this._likeButton = this._element.querySelector('.element__like-button')
		this._likeButton.addEventListener('click', (evt) => {
			evt.target.classList.toggle('element__like-button_active');
		});
		
		this._element.querySelector('.element__image').addEventListener('click', () => {
			const popupImage = document.querySelector('.image-popup')
			const imagePopupImage = popupImage.querySelector('.image-popup__image')
			const titlePopupImage = popupImage.querySelector('.image-popup__title')
			imagePopupImage.src = this._link
			imagePopupImage.alt = "Изображение " + this._title;

			titlePopupImage.textContent = this._title
			this.openPopup(popupImage)
		});
	  }
	//здесь будут другие методы
}

export default Card

// class Card {
//     constructor (title, link){

//     }

//     createCard(title, link) {
//         const elementTemplateClone = elementTemplateContent.querySelector('.element').cloneNode(true);
//         const elementTitle = elementTemplateClone.querySelector('.element__title')
//         const image = elementTemplateClone.querySelector('.element__image')
//         const imagePopupImage = popupImage.querySelector('.image-popup__image')
      
//         elementTitle.textContent = title;
//         image.src = link
//         image.alt = title
      
//         //Лайк картинки
//         elementTemplateClone.querySelector('.element__like-button').addEventListener('click', function (evt) {
//           evt.target.classList.toggle('element__like-button_active');
//         });
      
//         //Открытие картинки
//         image.addEventListener('click', function () {
//           // const closestImage = popupImage.closest('.element__image')
//           imagePopupImage.src = image.src
//           imagePopupImage.alt = elementTitle.textContent
      
//           titlePopupImage.textContent = elementTitle.textContent
//           openPopup(popupImage)
//           //Закрытие картинки
      
//         });
      
//         //Удалить карточку
//         const deleteButton = elementTemplateClone.querySelector('.element__delete-button');
//         deleteButton.addEventListener('click', function () {
//           const card = deleteButton.closest('.element');
//           card.remove();
//         });
      
//         return (elementTemplateClone)
//       }

// }