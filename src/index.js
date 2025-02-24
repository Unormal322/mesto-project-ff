import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// DOM элементы страницы
const cardList = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const allPopups = document.querySelectorAll('.popup');
const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formAddCard = document.forms['new-place'];
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

// Выводим карточки на страницу (заменить)
for (let i = 0; i < initialCards.length; i++) {т
    cardList.append(createCard(initialCards[i], deleteCard, likeCard, viewImage));
};

// Обработчик открытия popup'a редактирования профиля
buttonProfileEdit.addEventListener('click', function () {
    openEditPopup();
});

// Обработчик открытия popup'a добавления карточки
buttonAddNewCard.addEventListener('click', function () {
    openModal(popupAddNewCard);
});

const openEditPopup = () => {
    nameInput.value = profileTitle.textContent;;
    jobInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
};

// Обработчик оверлея и крестика
allPopups.forEach( function (popup) {
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup);
        };
        if (evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        };
    });
});

// Функция отправки формы для профиля
function sumbitProfileForm(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Выбираем нужные элементы и указываем значения
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(popupEditProfile);
};

// Обработчки для события "submit" для профиля
profileForm.addEventListener('submit', sumbitProfileForm); 

// Функция добавления карточки
function addNewCard(evt) {
    evt.preventDefault();

    const newCardName = formAddCard.elements['place-name'].value;
    const newCardLink = formAddCard.elements.link.value;
    const card = { name: newCardName, link: newCardLink };

    cardList.prepend(createCard(card, deleteCard, likeCard, viewImage));

    closeModal(popupAddNewCard);
    formAddCard.reset();
};

// Обработчки для события "submit" для карточки
formAddCard.addEventListener('submit', addNewCard); 

// Функция просмотра изображения
function viewImage(imageDescription, imageLink) {
    // Устанавливаем значение переменных
    popupImage.src = imageLink;
    popupImage.alt = imageDescription;
    popupImageCaption.textContent = imageDescription;

    openModal(popupTypeImage);
};