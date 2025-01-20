// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(nameValue, linkValue) {
    // Клонируем карточку
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // Добавляем наполнение карточки
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;

    // Добавляем обработчик на кнопку
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardToRemove) {
    cardToRemove.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    cardList.append(createCard(card.name, card.link, deleteCard));
})