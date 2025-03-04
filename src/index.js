import './pages/index.css';
import { createCard, deleteCard, changeLike, checkStatusLike } from './components/card';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, validationConfig, clearValidation } from './scripts/validation.js';
import { api } from './scripts/api.js'

// DOM элементы страницы
const cardList = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const buttonEditAvatar = document.querySelector('.profile__image-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const allPopups = document.querySelectorAll('.popup');
const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const formAddCard = document.forms['new-place'];
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const formEditAvatar = document.forms['new-avatar'];

// Переменная для id пользователя
let currentUserId;

// Обработчик открытия popup'a редактирования профиля
buttonProfileEdit.addEventListener('click', function () {
    openEditPopup();
});

// Обработчик открытия popup'a добавления карточки
buttonAddNewCard.addEventListener('click', function () {
    openModal(popupAddNewCard);
    clearValidation(formAddCard, validationConfig);
});

const openEditPopup = () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
    clearValidation(profileForm, validationConfig);
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

// Функция обновления данных пользователя
function editProfileInfo(data) {
    nameInput.textContent = data.name;
    jobInput.textContent = data.about;
};

// Функция отправки формы для профиля
function sumbitProfileForm(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Выбираем нужные элементы и указываем значения
    const name = nameInput.value;
    const about = jobInput.value;

    // Находим кнопку submit
    const buttonSubmit = evt.submitter;
    // Сохраняем начальный текст кнопки по макету
    const initialButtonText = buttonSubmit.textContent;
    // Меняем текст кнопки при загрузке по макету
    buttonSubmit.textContent = 'Сохранение...';

    api.patchProfileInfo(name, about)
        .then((userData) => {
            editProfileInfo(userData);
            closeModal(popupEditProfile);
            renderInfo(userData);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // Возвращаем начальный текст кнопки
            buttonSubmit.textContent = initialButtonText;
        });
};

// Обработчки для события "submit" для профиля
profileForm.addEventListener('submit', sumbitProfileForm); 

// Функция отправки формы для добавления карточки
function addNewCard(evt) {
    evt.preventDefault();

    // Получаем данные из формы
    const name = formAddCard.elements['place-name'].value;
    const link = formAddCard.elements.link.value;

    // Находим кнопку submit
    const buttonSubmit = evt.submitter;
    // Сохраняем начальный текст кнопки по макету
    const initialButtonText = buttonSubmit.textContent;
    // Меняем текст кнопки при загрузке по макету
    buttonSubmit.textContent = 'Сохранение...';

    // Отправляем данные на сервер
    api.postCards(name, link)
        .then((newCard) => {
            // Создаем карточку и добавляем на страницу в начало списка
            cardList.prepend(createCard(newCard, currentUserId, handleDelete, handleLike, viewImage));

            // Очищаем форму и закрываем модальное окно
            formAddCard.reset();
            closeModal(popupAddNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // Возвращаем начальный текст кнопки
            buttonSubmit.textContent = initialButtonText;
        });
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

// Обработчик открытия popup'a редактирования аватара
buttonEditAvatar.addEventListener('click', function () {
    openModal(popupEditAvatar);
    clearValidation(formEditAvatar, validationConfig);
});

// Функция отправки формы для нового аватара
function addNewAvatar(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Получаем данные из формы
    const link = formEditAvatar.elements.link.value;

    // Находим кнопку submit
    const buttonSubmit = evt.submitter;
    // Сохраняем начальный текст кнопки по макету
    const initialButtonText = buttonSubmit.textContent;
    // Меняем текст кнопки при загрузке по макету
    buttonSubmit.textContent = 'Сохранение...';

    api.updateAvatar(link)
        .then((userAvatar) => {
            updateAvatarOnPage(userAvatar.avatar);
            closeModal(popupEditAvatar);
            formEditAvatar.reset();
            clearValidation(formEditAvatar, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // Возвращаем начальный текст кнопки
            buttonSubmit.textContent = initialButtonText;
        });
};

// Функция для обновления аватара
function updateAvatarOnPage(url) {
    profileAvatar.src = url;
}

// Обработчки для события "submit" для карточки
formEditAvatar.addEventListener('submit', addNewAvatar); 

// Вызовем функцию для валидации полей из validation.js
enableValidation(validationConfig);

// Воспользуемся методом Promise.all()
Promise.all([api.getUserInformation(), api.getCardsList()])
    .then(([userData, cardsData]) => {
        // Сохранияем id пользователя
        currentUserId = userData._id;

        // Отображаем информацию о пользователе
        renderInfo(userData);

        // Отображаем карточки
        renderCards(cardsData, currentUserId);
    })
    .catch((err) => {
        console.log(err);
    });

//Функция для отображения информации о пользователе
function renderInfo(data) {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
};

// Функция поставить/снять лайк с карточки
function handleLike(cardElement, cardId) {
    // Получаем данные о лайках
    const likes = JSON.parse(cardElement.dataset.likes);
    const isLiked = checkStatusLike(likes, currentUserId);

    (isLiked ? api.deleteLikeFromCard(cardId) : api.putLikeToCard(cardId))
        .then((res) => {
            // Обновляем лайки на карточке
            changeLike(res.likes, cardElement, currentUserId);

            // Обновляем данные о лайках в атрибуте
            cardElement.dataset.likes = JSON.stringify(res.likes);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Функция удалить карточку со страницы
const handleDelete = (cardElement, cardId) => {
    api.deleteCardsFromServer(cardId)
        .then(() => {
            // Удаляем карточку из DOM
            deleteCard(cardElement);
        })
        .catch((err) => {
            console.log(err);
        });
};


// Функция для отображения карточек на странице
function renderCards(cardsData, currentUserId) {
    cardsData.forEach((card) => {
        const cardElement = createCard(card, currentUserId, handleDelete, handleLike, viewImage);
        cardList.append(cardElement);
    });
}