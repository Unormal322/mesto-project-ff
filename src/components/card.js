// Функция создания карточки
export function createCard(card, currentUserId, removeCard, likeTheCard, viewingCard) {
    // Клонируем карточку
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    // Сохраняем данные о лайках в атрибуте
    cardElement.dataset.likes = JSON.stringify(card.likes);

    // Добавляем наполнение карточки
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    // Добавляем отображение количества лайков
    const numberOfLikes = cardElement.querySelector('.number-of-likes');
    numberOfLikes.textContent = card.likes.length;

    // Проверяем, создана ли карточка текущим пользователем
    if (card.owner._id === currentUserId) {
        // Добавляем иконку удаления
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => removeCard(cardElement, card._id));
    }

    // Находим кнопку лайка
    const likeButton = cardElement.querySelector('.card__like-button');

    // Проверяем, лайкнул ли текущий пользователь карточку
    if (checkStatusLike(card.likes, currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // Добавляем обработчик на кнопку лайка
    likeButton.addEventListener('click', () => likeTheCard(cardElement, card._id));

    // Добавляем обработчик на изображение карточки
    cardImage.addEventListener('click', () => viewingCard(card.name, card.link));

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
};

// Функция обновления лайков (кнопка и счетчик)
export function changeLike(likes, cardElement, currentUserId) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const numberOfLikes = cardElement.querySelector('.number-of-likes');

    // Обновляем количество лайков
    numberOfLikes.textContent = likes.length;

    // Используем toggle для переключения класса
    likeButton.classList.toggle('card__like-button_is-active', checkStatusLike(likes, currentUserId));
};

// Функция проверки, лайкнул ли текущий пользователь карточку
export function checkStatusLike(likes, currentUserId) {
    return likes.some((user) => user._id === currentUserId);
};