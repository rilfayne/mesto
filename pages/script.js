const editButton = document.querySelector('.profile__edit-button')
const popupInfo = document.querySelector('.popup-info')
const closeInfoButton = popupInfo.querySelector('.popup-info__close')
const formInfo = popupInfo.querySelector('.popup-info__form')
let nameInput = popupInfo.querySelector('.popup__input_name')
let descriptionInput = popupInfo.querySelector('.popup__input_description')
let nameProfile = document.querySelector('.profile__name')
let descriptionProfile = document.querySelector('.profile__description')
const addButton = document.querySelector('.profile__add-button')
const popupPlace = document.querySelector('.popup-place')
const closePlaceButton = popupPlace.querySelector('.popup-place__close')
const placeList = document.querySelector('.places__list')
let newPlaceNameInput = popupPlace.querySelector('.popup__input_place-name')
let newPlaceLinkInput = popupPlace.querySelector('.popup__input_link')
const formPlace = popupPlace.querySelector('.popup-place__form')

// Открытие и закрытие попапа

const popupInfoToggle = function(evt) {
  popupInfo.classList.toggle('popup-info_opened') // добавляем или убираем класс попапу

  if (popupInfo.classList.contains('popup-info_opened')) {
  nameInput.value = nameProfile.textContent; // заполняем графу name
  descriptionInput.value = descriptionProfile.textContent; // заполняем графу description
  }
}

// закрытие попапа Info по клику на полупрозрачный фон
const closeInfoPopup = function(evt) {
  if (evt.target !== evt.currentTarget) { return } 
  popupInfoToggle(evt)
}

// Изменение данных профиля

const formSubmitHandler = function(evt) {
  evt.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  popupInfoToggle(evt) // закрываем окно
}

// Реализуем добавление шести карточек при загрузке страницы

// Массив с данным для шести карточек 

const initialCards = [
  {
      name: 'Сибирь',
      link: 'https://images.unsplash.com/photo-1589659925724-1dbf17849e93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'Олени'
  },
  {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1580474256381-f98bb0532dc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
      alt: 'Сёрфер'
  },
  {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1552857407-c7e8dec595e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=973&q=80',
      alt: 'Байкал'
  },
  {
      name: 'Карелия',
      link: 'https://images.unsplash.com/photo-1559029884-4e34093db5b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80',
      alt: 'Деревня'
  },
  {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1552321570-b74810c6265d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'Ледяная пещера'
  },
  {
      name: 'Тулиновка',
      link: 'https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
      alt: 'Сосновый лес'
  }
];

//загрузка карточек из массива
const showCards = function() {
  initialCards.forEach(function (place) {
      // берем содержимое тега template
      const placeTemplate = document.querySelector('#place').content

      // клонируем содержимое тега template
      const placeElement = placeTemplate.cloneNode(true)

      // наполняем сожержимым из массива initialCards
      placeElement.querySelector('.place__image').src = place.link
      placeElement.querySelector('.place__image').alt = place.alt
      placeElement.querySelector('.place__name').textContent = place.name

      // отображаем на странице
      placeList.append(placeElement)
  });
}
showCards()

// ДОБАВИМ НОВУЮ КАРТОЧКУ

const placeSubmitHandler = function(evt) {
  evt.preventDefault();

  // подгружаем данные из формы в массив

  initialCards.unshift({
    name: newPlaceNameInput.value,
    link: newPlaceLinkInput.value,
    alt: newPlaceNameInput.value
  });

  //ВСТАВИМ НОВУЮ КАРТОЧКУ НА СТРАНИЦУ

  // выбираем только что добавленный элемент массива
  const newElement = initialCards[0]

  const addOneCard = function (newElement) {
    // берем содержимое тега template
    const placeTemplate = document.querySelector('#place').content

    // клонируем содержимое тега template
    const placeElement = placeTemplate.cloneNode(true)

    // наполняем сожержимым из нового элемента массива
    placeElement.querySelector('.place__image').src = newElement.link
    placeElement.querySelector('.place__image').alt = newElement.alt
    placeElement.querySelector('.place__name').textContent = newElement.name

    // отображаем на странице
    placeList.prepend(placeElement)
  }
  addOneCard(newElement)
  
  // закрываем окно
  popupPlaceToggle(evt)

  // обнуляем поля в форме
  newPlaceLinkInput.value = '' 
  newPlaceNameInput.value = ''
}

// Открытие и закрытие попапа place

const popupPlaceToggle = function(evt) {
  popupPlace.classList.toggle('popup-place_opened') // добавляем или убираем класс попапу place
}

// закрытие попапа Place по клику на полупрозрачный фон
const closePlacePopup = function(evt) {
  if (evt.target !== evt.currentTarget) { return } 
  popupPlaceToggle(evt)
}

// Слушатели

editButton.addEventListener('click', popupInfoToggle)
closeInfoButton.addEventListener('click', popupInfoToggle)
popupInfo.addEventListener('click', closeInfoPopup)
formInfo.addEventListener('submit', formSubmitHandler)
addButton.addEventListener('click', popupPlaceToggle)
closePlaceButton.addEventListener('click', popupPlaceToggle)
popupPlace.addEventListener('click', closePlacePopup)
formPlace.addEventListener('submit', placeSubmitHandler)