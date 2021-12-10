import { handleSubmitForm } from "./signup";
import { handleSubmitFormSignIn } from "./signin";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const MIN_PASSWORD_LENGTH = 6;

const signUpForm = document.querySelector('#form-signup');
const signInForm = document.querySelector('#form-signin');

signUpForm?.addEventListener('submit', handleSubmitForm);
signInForm?.addEventListener('submit', handleSubmitFormSignIn);

const handleLoadWindow = () => {
    if (JSON.parse(localStorage.getItem('userData'))?.token) {
        setTimeout(() => {
            window.location.assign('./movies.html');
        }, 3000);
    }
}

window.addEventListener('load', handleLoadWindow);

const passwordSignIn = document.querySelector('#signin__password');

signUpForm?.addEventListener('input', (event) => {
    const target = event.target;
    const valueLength = target.value.length;
    const reg = new RegExp('^[0-9]+$')
    target.classList.remove('error')

    switch (true) {
        case(valueLength < MIN_NAME_LENGTH):
            target.classList.add('error');
            target.nextElementSibling.textContent = `${  MIN_NAME_LENGTH - valueLength } more characters.`;
            break;
        case (valueLength > MAX_NAME_LENGTH):
            target.classList.add('error');
            target.nextElementSibling.textContent = `${  MAX_NAME_LENGTH - valueLength } more characters.`;
            break;
        case (target.classList.contains('input-login') && reg.test(target.value)):
            target.classList.add('error');
            target.nextElementSibling.textContent = 'Login should not consist only of numbers';
            break;
        case (target.classList.contains('input-password') && valueLength<MIN_PASSWORD_LENGTH):
            target.classList.add('error');
            target.nextElementSibling.textContent = `Password is too short. Min value 6 symbols`;
            break;
        default:
            target.setCustomValidity('');
            target.reportValidity();
    }
});

signInForm?.addEventListener('input', (event) => {
    let target = event.target;
    const valueLength = target.value.length;
    target.classList.remove('error')

    switch (true) {
        case(valueLength < MIN_NAME_LENGTH):
            target.classList.add('error');
            target.nextElementSibling.textContent = `${MIN_NAME_LENGTH - valueLength} more characters.`
            break;
        case (valueLength > MAX_NAME_LENGTH && !passwordSignIn):
            target.classList.add('error');
            target.nextElementSibling.textContent = `${MAX_NAME_LENGTH - valueLength} more characters.`
            break;
        case (target.classList.contains('input-password') && valueLength < MIN_PASSWORD_LENGTH):
            target.classList.add('error');
            target.nextElementSibling.textContent = `Password is too short. Min value 6 symbols`;
            break;
        default:
            target.setCustomValidity('');
            target.reportValidity();
    }
});

const body = document.querySelector('body');
let messageElement;

export const showMessageError = () => {
    const messageTemplate = document.querySelector('#error').content.querySelector('.error-popup');
    // const closeErrorButton = messageTemplate.querySelector('.error__button');
    messageElement = messageTemplate.cloneNode(true);

    body.appendChild(messageElement);

    body.addEventListener('click', messageDeleteHandler, {once: true});
    // closeErrorButton.addEventListener('click', messageDeleteHandler, {once: true});
};

const messageDeleteHandler = () => {
    messageElement.remove();
};
