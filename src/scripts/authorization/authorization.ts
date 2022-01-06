import handleSubmitForm from './signup';
import handleSubmitFormSignIn from './signin';
import * as helpers from './helpers';
import domElements from './global-var';

window.addEventListener('load', helpers.handleLoadWindow);
domElements.signUpForm?.addEventListener('input', helpers.generateMessageValidation);
domElements.signInForm?.addEventListener('input', helpers.generateMessageValidation);
domElements.signUpForm?.addEventListener('submit', handleSubmitForm);
domElements.signInForm?.addEventListener('submit', handleSubmitFormSignIn);
domElements.headerLink.addEventListener('click', helpers.preventDefault);
