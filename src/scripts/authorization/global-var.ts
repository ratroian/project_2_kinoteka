import { TDomElements } from './types';

const domElements: TDomElements = {
    signUpForm: document.querySelector('#form-signup'),
    signInForm: document.querySelector('#form-signin'),
    passwordSignIn: document.querySelector('#signin__password'),
    headerLink: document.querySelector('.header a'),
    signInButton: document.querySelector('#sign-in-button'),
    signUpButton: document.querySelector('#sign-up-button'),
};

export default domElements;
