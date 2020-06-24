const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeButton = popup.querySelector('.popup__close')
const form = popup.querySelector('.popup__form')
let nameInput = popup.querySelector('.popup__input_name')
let descriptionInput = popup.querySelector('.popup__input_description')
let nameProfile = document.querySelector('.profile__name')
let descriptionProfile = document.querySelector('.profile__description')

// Открытие и закрытие попапа

const popupToggle = function(event) {
  popup.classList.toggle('popup_opened') // добавляем или убираем класс попапу

  if (event.target === editButton) {
  nameInput.value = nameProfile.textContent; // заполняем графу name
  descriptionInput.value = descriptionProfile.textContent; // заполняем графу description
  }
}

// закрытие попапа по клику на полупрозрачный фон
const closePopup = function(event) {
  if (event.target !== event.currentTarget) { return } 
  popupToggle()
}

// Изменение данных профиля

const formSubmitHandler = function(event) {
  event.preventDefault();
  
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;

  popupToggle() // закрываем окно
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

const placeList = document.querySelector('.places__list')

const addPlace = initialCards.forEach(function (place) {
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


// Слушатели

editButton.addEventListener('click', popupToggle)
closeButton.addEventListener('click', popupToggle)
popup.addEventListener('click', closePopup)
form.addEventListener('submit', formSubmitHandler)