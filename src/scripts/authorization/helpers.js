import * as constants from './constants';

const body = document.querySelector('body');
let messageElement;

const showMessageError = (message) => {
    const messageTemplate = document.querySelector('#error').content.querySelector('.error-popup');
    const textContentTemplate = messageTemplate.querySelector('.error__message');
    textContentTemplate.textContent = message;
    messageElement = messageTemplate.cloneNode(true);

    body.appendChild(messageElement);

    body.addEventListener('click', messageDeleteHandler, { once: true });
};

const messageDeleteHandler = () => {
    messageElement.remove();
};

export const addClassToElement = (element) => element.classList.add(constants.CLASS_ERROR);
export const removeClassToElement = (element) => element.classList.remove(constants.CLASS_ERROR);
export const addTextContentToElement = (element, content) => {
    element.nextElementSibling.textContent = content;
};
export const preventDefault = (event) => event.preventDefault();
export const checkToken = () => JSON.parse(localStorage.getItem(constants.KEY_USER_DATA))?.token;

export const setButtonLoader = (button) => {
    button.classList.add(constants.CLASS_LOADER);
    button.disabled = true;
};
export const removeButtonLoader = (button) => {
    button.classList.add(constants.CLASS_LOADER);
    button.disabled = false;
};

export default showMessageError;
