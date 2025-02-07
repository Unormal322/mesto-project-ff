// Функция создания карточки
export function createCard(card, removeCard, likeTheCard, viewingCard) {
    // Клонируем карточку
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    // Добавляем наполнение карточки
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    // Добавляем обработчик на кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => removeCard(cardElement));

    // Добавляем обработчик на кнопку лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeTheCard(likeButton));
    
    // Добавляем обработчик на изображение карточки
    cardImage.addEventListener('click', function () {
        viewingCard(card.name, card.link);
    });

    return cardElement;
};

// Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
};

// Функция лайка карточки
export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};