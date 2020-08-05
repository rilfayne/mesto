// import {newPlaceLinkInput, newPlaceNameInput} from "../utils/constants";

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

  addItem(element) {
    this._container.prepend(element)
  }
}
