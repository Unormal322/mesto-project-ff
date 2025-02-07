// Импортируем template карточек
import { cardTemplate } from '../index.js';

// Функция создания карточки
export function createCard(card, removeCard, likeTheCard, viewingCard) {
    // Клонируем карточку
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // Добавляем наполнение карточки
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.setAttribute('alt', card.name);

    // Добавляем обработчик на кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    // Добавляем обработчик на кнопку лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeTheCard);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', function () {
        viewingCard(card.name, card.link);
    });

    return cardElement;
};

// Функция удаления карточки
export function deleteCard(cardRemove) {
    const item = cardRemove.target.parentElement;
    item.remove();
};

// Функция лайка карточки
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};