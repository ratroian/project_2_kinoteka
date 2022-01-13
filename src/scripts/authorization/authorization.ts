import handleSubmitFormSignUp from './signup';
import handleSubmitFormSignIn from './signin';
import * as helpers from './helpers';
import domElements from './global-var';

window.addEventListener('load', helpers.handleLoadWindow);
domElements.signUpForm?.addEventListener('submit', handleSubmitFormSignUp);
domElements.signInForm?.addEventListener('submit', handleSubmitFormSignIn);
domElements.headerLink.addEventListener('click', helpers.preventDefault);
