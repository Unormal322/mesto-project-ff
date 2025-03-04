export const validationConfig = {
    popupForm: '.popup__form',
    popupInput: '.popup__input',
    popupButton: '.popup__button',
    popupButtonDisabled: 'popup__button_disabled',
    popupInputError: 'popup__input_type_error',
    popupErrorVisible: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.popupInputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.popupErrorVisible);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.popupInputError);
    errorElement.classList.remove(validationConfig.popupErrorVisible);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        // Заменяем стандартное сообщение об ошибке
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        // в ином случае оставляем стандартные сообщения браузера
        inputElement.setCustomValidity("");
    };
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.popupInput));
    const buttonElement = formElement.querySelector(validationConfig.popupButton);
    
    // Вызываем функцию отключения кнопки до ввода данных
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = () => {
    // Найдём все формы с указанным классом, сделаем из них массив
    const formList = Array.from(document.querySelectorAll(validationConfig.popupForm));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
        setEventListeners(formElement);
    });
};

// Функция проверки невалидных полей
const hasInvalidInput = (inputList) => {
    // Проходим по массиву 
    return inputList.some((inputElement) => {
        // Если поле не валидно, прекращаем обход и возвращаем true
        return !inputElement.validity.valid;
    })
};

// Функция для отключения кнопки при невалидных данных
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        // Делаем кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.popupButtonDisabled);
    } else {
        // При валидных полях делаем кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.popupButtonDisabled);
    }
};

export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.popupInput));
    
    // Скрываем ошибки для валидных полей
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement); 
    });

    // Включаем/Выключаем кнопку в зависимости от валидности полей
    const buttonElement = formElement.querySelector(validationConfig.popupButton);
    toggleButtonState(inputList, buttonElement);
};