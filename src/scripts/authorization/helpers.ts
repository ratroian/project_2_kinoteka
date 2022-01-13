import * as constants from './constants';
import domElements from './global-var';
import { REGEX } from './regex';
import { TErrorObject } from './types';

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

export const handleLoadWindow = () => {
    if (checkToken()) {
        setTimeout(() => {
            window.location.assign(constants.MOVIES_PAGE_URL);
        }, constants.QUANTITY_SET_TIMEOUT_SEC * 1000);
    }
};

export const isValidName = (name: string): TErrorObject => {
    switch (true) {
        case (!REGEX.STARTS_WITH_UPPERCASE_LETTER.test(name)):
            return { status: false, message: constants.MESSAGE_UPPERCASE_LETTER };
        case (!REGEX.ONLY_LATIN_LETTERS.test(name)):
            return { status: false, message: constants.MESSAGE_LATIN_LETTER };
        case (name.length < 2):
            return { status: false, message: constants.MESSAGE_MIN_CHARACTERS };
        default:
            return { status: true, message: '' };
    }
};

export const isValidLogin = (login: string): TErrorObject => {
    switch (true) {
        case (!REGEX.ONLY_LATIN_LETTERS_AND_NUMBERS.test(login)):
            return { status: false, message: constants.MESSAGE_LATIN_LETTER_AND_NUMBERS };
        case (login.length < 4 || login.length > 20):
            return { status: false, message: constants.MESSAGE_RANGE_CHARACTERS };
        case (!REGEX.STARTS_WITH_LETTER.test(login)):
            return { status: false, message: constants.MESSAGE_START_WITH_LETTER };
        default:
            return { status: true, message: '' };
    }
};

export const isValidPassword = (password: string): TErrorObject => {
    switch (true) {
        case (password.length < 8):
            return { status: false, message: constants.MESSAGE_MIN_SYMBOLS };
        case (!REGEX.MINIMUM_ONE_NUMBER.test(password)):
            return { status: false, message: constants.MESSAGE_MIN_NUMBERS };
        case (!REGEX.MINIMUM_ONE_LOWERCASE.test(password)):
            return { status: false, message: constants.MESSAGE_LOWER_CASE_LETTER };
        case (!REGEX.MINIMUM_ONE_UPPERCASE.test(password)):
            return { status: false, message: constants.MESSAGE_ONE_UPPERCASE_LETTER };
        default:
            return { status: true, message: '' };
    }
};
