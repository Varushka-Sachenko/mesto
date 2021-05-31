export default class Section{
    constructor ({items, renderer}, containerSelector){
        this._items = items
        this._renderer = renderer
        this._containerElement = document.querySelector(containerSelector)
        this.addItem = this.addItem.bind(this)
    }

    drawAllCards(){
        this._items.forEach(item => this.addItem(this._renderer(item)))
    }

    addItem(element){
        this._containerElement.prepend(element)
    }

}