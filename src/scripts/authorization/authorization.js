import { handleSubmitForm } from './signup';
import handleSubmitFormSignIn from './signin';
import * as constans from './constans';
import { MIN_PASSWORD_LENGTH, CLASS_LOGIN, CLASS_PASSWORD } from './constans';
import * as helpers from "./helpers";

const signUpForm = document.querySelector('#form-signup');
const signInForm = document.querySelector('#form-signin');
const passwordSignIn = document.querySelector('#signin__password');
const headerLink = document.querySelector('.header a');

const handleLoadWindow = () => {
    if (JSON.parse(localStorage.getItem('userData'))?.token) {
        setTimeout(() => {
            window.location.assign('./movies.html');
        }, 3000);
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
        case (valueLength < constans.MIN_NAME_LENGTH):
            showMessageValidation(target, `${constans.MIN_NAME_LENGTH - valueLength} more characters.`);
            break;
        case (valueLength > constans.MAX_NAME_LENGTH && !passwordSignIn):
            showMessageValidation(target, `${constans.MAX_NAME_LENGTH - valueLength} more characters.`);
            break;
        case (target.classList.contains(CLASS_PASSWORD) && valueLength < MIN_PASSWORD_LENGTH):
            showMessageValidation(target, constans.TEXT_CONTENT_PASSWORD_MESSAGE);
            break;
        case (target.classList.contains(CLASS_LOGIN) && constans.REGULAR.test(target.value)):
            showMessageValidation(target, constans.TEXT_CONTENT_LOGIN_MESSAGE);
            break;
        default:
            target.setCustomValidity('');
            target.reportValidity();
    }
};

window.addEventListener('load', handleLoadWindow);
signUpForm?.addEventListener('input', generateMessageValidation);
signInForm?.addEventListener('input', generateMessageValidation);
signUpForm?.addEventListener('submit', handleSubmitForm);
signInForm?.addEventListener('submit', handleSubmitFormSignIn);
headerLink.addEventListener('click', helpers.preventDefault);
