import * as constants from './constants';
import domElements from './global-var';

const createElementFromHtml = (htmlString: string): ChildNode => {
    const template: HTMLTemplateElement = document.createElement('template');
    htmlString = htmlString.trim();
    template.innerHTML = htmlString;
    return template.content.firstChild;
};

const messageDeleteHandler = (element: HTMLElement) => {
    element.remove();
};

export const showMessageError = (message: string): void => {
    const html: string = domElements.errorTemplate.replace('{{message}}', message);
    const element: ChildNode = createElementFromHtml(html);
    document.body.appendChild(element);
    document.body.addEventListener('click', messageDeleteHandler.bind(null, element));
};

export const addClassToElement = (element: HTMLElement): void => {
    element.classList.add(constants.CLASS_ERROR);
};

export const removeClassToElement = (element: HTMLElement):void => {
    element.classList.remove(constants.CLASS_ERROR);
};

export const addTextContentToElement = (element: HTMLElement, content: string): void => {
    element.nextElementSibling.textContent = content;
};

export const preventDefault = (event: Event) => event.preventDefault();

export const checkToken = ():string => (
    JSON.parse(localStorage.getItem(constants.KEY_USER_DATA))?.token
);

export const setButtonLoader = (button: HTMLButtonElement): void => {
    button.classList.add(constants.CLASS_LOADER);
    button.disabled = true;
};

export const removeButtonLoader = (button: HTMLButtonElement): void => {
    button.classList.remove(constants.CLASS_LOADER);
    button.disabled = false;
};

export const showMessageValidation = (element: HTMLElement, content: string): void => {
    addClassToElement(element);
    addTextContentToElement(element, content);
};

export const generateMessageValidation = (event: Event & { target: HTMLInputElement }) => {
    const { target } = event;
    const valueLength = target.value.length;
    removeClassToElement(target);

    switch (true) {
        case (valueLength < constants.MIN_NAME_LENGTH):
            showMessageValidation(target, `${constants.MIN_NAME_LENGTH - valueLength} more characters.`);
            break;
        case (valueLength > constants.MAX_NAME_LENGTH && !domElements.passwordSignIn):
            showMessageValidation(target, `${constants.MAX_NAME_LENGTH - valueLength} more characters.`);
            break;
        case (target.classList.contains(constants.CLASS_PASSWORD) && valueLength < constants.MIN_PASSWORD_LENGTH):
            showMessageValidation(target, constants.TEXT_CONTENT_PASSWORD_MESSAGE);
            break;
        case (target.classList.contains(constants.CLASS_LOGIN) && constants.REGULAR.test(target.value)):
            showMessageValidation(target, constants.TEXT_CONTENT_LOGIN_MESSAGE);
            break;
        default:
            target.setCustomValidity('');
            target.reportValidity();
    }
};

export const handleLoadWindow = () => {
    if (checkToken()) {
        setTimeout(() => {
            window.location.assign(constants.MOVIES_PAGE_URL);
        }, constants.QUANTITY_SET_TIMEOUT_SEC * 1000);
    }
};
