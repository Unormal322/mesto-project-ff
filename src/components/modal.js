// Закрытие popup'a на Escape
const handleEscape = (evt) => {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal(popupOpen);
    };
};

// Функция открытия popup'a
export function openModal(item) {
    item.classList.toggle('popup_is-animated');
    setTimeout( () => {
        item.classList.toggle('popup_is-opened');
    }, 100);
    document.addEventListener('keydown', handleEscape);
};

// Функция закрытия popup'a
export function closeModal(item) {
    item.classList.remove('popup_is-opened');
    setTimeout( () => {
        item.classList.remove('popup_is-animated');
    }, 600);
    document.removeEventListener('keydown', handleEscape);
};