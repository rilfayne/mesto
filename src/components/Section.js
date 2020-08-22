export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = containerSelector;
  }

  renderItems() {
    // метод, который отвечает за отрисовку всех элементов
    this._renderedItems.forEach(place => this._renderer(place))
  }

  addItem(card, placeObject, myId) {
    placeObject.likes.forEach((like) => {
      if(like._id === myId) {
        const likeButton = card.querySelector('.place__button-like')
          likeButton.classList.add('place__button-like_active')
      }
    })

    this._container.append(card)
  }

  addNewCard(card) {
    this._container.prepend(card)
  }
}
