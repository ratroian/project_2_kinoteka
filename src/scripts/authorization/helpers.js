import * as constans from "./constans";

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

export const addClassToElement = (element) => element.classList.add(constans.CLASS_ERROR);
export const removeClassToElement = (element) => element.classList.remove(constans.CLASS_ERROR);
export const addTextContentToElement = (element, content) => {
    element.nextElementSibling.textContent = content;
};
export const preventDefault = (event) => event.preventDefault();

export default showMessageError;
