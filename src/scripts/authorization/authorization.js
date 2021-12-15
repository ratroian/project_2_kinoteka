import { handleSubmitForm } from './signup';
import handleSubmitFormSignIn from './signin';
import * as constants from './constants';
import { MIN_PASSWORD_LENGTH, CLASS_LOGIN, CLASS_PASSWORD } from './constants';
import * as helpers from './helpers';
import domElements from './global-var';

const handleLoadWindow = () => {
    if (helpers.checkToken()) {
        setTimeout(() => {
            window.location.assign(constants.MOVIES_PAGE_URL);
        }, constants.QUANTITY_SET_TIMEOUT_SEC * 1000);
    }
};

const showMessageValidation = (element, content) => {
    helpers.addClassToElement(element);
    helpers.addTextContentToElement(element, content);
};

const generateMessageValidation = (event) => {
    const { target } = event;
    const valueLength = target.value.length;
    helpers.removeClassToElement(target);

    switch (true) {
        case (valueLength < constants.MIN_NAME_LENGTH):
            showMessageValidation(target, `${constants.MIN_NAME_LENGTH - valueLength} more characters.`);
            break;
        case (valueLength > constants.MAX_NAME_LENGTH && !domElements.passwordSignIn):
            showMessageValidation(target, `${constants.MAX_NAME_LENGTH - valueLength} more characters.`);
            break;
        case (target.classList.contains(CLASS_PASSWORD) && valueLength < MIN_PASSWORD_LENGTH):
            showMessageValidation(target, constants.TEXT_CONTENT_PASSWORD_MESSAGE);
            break;
        case (target.classList.contains(CLASS_LOGIN) && constants.REGULAR.test(target.value)):
            showMessageValidation(target, constants.TEXT_CONTENT_LOGIN_MESSAGE);
            break;
        default:
            target.setCustomValidity('');
            target.reportValidity();
    }
};

window.addEventListener('load', handleLoadWindow);
domElements.signUpForm?.addEventListener('input', generateMessageValidation);
domElements.signInForm?.addEventListener('input', generateMessageValidation);
domElements.signUpForm?.addEventListener('submit', handleSubmitForm);
domElements.signInForm?.addEventListener('submit', handleSubmitFormSignIn);
domElements.headerLink.addEventListener('click', helpers.preventDefault);
