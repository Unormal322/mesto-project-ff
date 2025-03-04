const serverConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
        authorization: 'b45f628c-5f99-496d-a575-f2a60605e9ea',
        "Content-Type": "application/json"
    }
};

const handleResponse = (response) => {
    if (response.ok) {
    return response.json();
    };
    return Promise.reject(`Ошибка: ${response.status}`);
};

// Получаем данные пользователя с сервера
const getUserInformation = () => {
    return fetch(serverConfig.baseUrl + '/users/me', {
        headers: serverConfig.headers
    })
    .then(handleResponse)
};

// Загружаем карточки с сервера
export const getCardsList = () => {
    return fetch(serverConfig.baseUrl + '/cards', {
        headers: serverConfig.headers
    })
    .then(handleResponse)
};

// Редактирование профиля
const patchProfileInfo = (name, about) => {
    return fetch (serverConfig.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: serverConfig.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(handleResponse)
};

// Добавление новой карточки на сервер
const postCards = (name, link) => {
    return fetch(serverConfig.baseUrl + '/cards', {
        method: 'POST',
        headers: serverConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(handleResponse)
};

// Лайк карточки
window.putLikeToCard = (cardId) => {
    return fetch(serverConfig.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: serverConfig.headers
    })
    .then(handleResponse)
};

// Убрать лайк с карточки
window.deleteLikeFromCard = (cardId) => {
    return fetch(serverConfig.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: serverConfig.headers
    })
    .then(handleResponse)
};

// Удаление карточки с сервера
window.deleteCardsFormServer = (cardId) => {
    return fetch(serverConfig.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: serverConfig.headers
    })
    .then(handleResponse)
};

// Обновление аватара профиля
const updateAvatar = (link) => {
    return fetch (serverConfig.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: serverConfig.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(handleResponse)
};

export const api = {
    getUserInformation: getUserInformation,
    getCardsList: getCardsList,
    patchProfileInfo: patchProfileInfo,
    postCards: postCards,
    updateAvatar: updateAvatar
};