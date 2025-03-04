// Функция создания карточки
export function createCard(card, currentUserId, removeCard, likeTheCard, viewingCard) {
    // Клонируем карточку
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    // Добавляем наполнение карточки
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;

    // Добавляем отображение количества лайков
    const numberOfLikes = cardElement.querySelector('.number-of-likes');
    numberOfLikes.textContent = card.likes.length;

    // Делаем проверку, создана ли карточка пользователем
    if (card.owner._id === currentUserId) {
        // Добавляем иконку удаления
        const deleteButton = cardElement.querySelector('.card__delete-button');
        // Выводим иконку корзины
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => removeCard(cardElement, card._id));
    }

    // Находим кнопку лайка
    const likeButton = cardElement.querySelector('.card__like-button');

    // Выполним проверку, поставил ли пользователь лайк на карточку или нет с помощью метода some
    const likedCard = card.likes.some((user) => {
        return user._id === currentUserId;
    })
    
    // Если ранее уже поставил лайк на данную карточку, добавляем кнопки класс active
    if (likedCard) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // Добавляем обработчик на кнопку лайка
    likeButton.addEventListener('click', () => likeTheCard(likeButton, card._id));
    
    // Добавляем обработчик на изображение карточки
    cardImage.addEventListener('click', function () {
        viewingCard(card.name, card.link);
    });

    return cardElement;
};

// Функция удаления карточки
export function deleteCard(cardElement, cardId) {
    window.deleteCardsFormServer(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
};

// Функция лайка для карточки
// Функция лайка карточки
export function likeCard(likeButton, cardId) {
    const likedCard = likeButton.classList.contains('card__like-button_is-active');

    if (!likedCard) {
        window.putLikeToCard(cardId)
        .then((like) => {
            // Добавляем класс для кнопки
            likeButton.classList.toggle('card__like-button_is-active');

            // Обновляем количество лайков на карточке
            const numberOfLikes = likeButton.closest('.card').querySelector('.number-of-likes');
            numberOfLikes.textContent = like.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        window.deleteLikeFromCard(cardId)
            .then((like) => {
                likeButton.classList.remove('card__like-button_is-active');

                // Обновляем количество лайков на карточке
                const numberOfLikes = likeButton.closest('.card').querySelector('.number-of-likes');
                numberOfLikes.textContent = like.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};