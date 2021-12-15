import axios from 'axios';
import * as constants from '../constants';
import * as helpers from './helpers';
import domElements from './global-var';

export const postSignUp = async (body) => {
    try {
        helpers.setButtonLoader(domElements.signUpButton);
        const response = await axios.post(constants.URL_SIGN_UP, body);
        return response.data;
    } catch (error) {
        return error;
    } finally {
        helpers.removeButtonLoader(domElements.signUpButton);
    }
};

export const checkRequest = async (body) => {
    try {
        const responseSignUp = await postSignUp(body);
        if (responseSignUp.message === constants.STATUS_REGISTRATION) {
            setTimeout(() => {
                window.location.assign(constants.INDEX_PAGE_URL);
            }, 250);
        }
    } catch (error) {
        console.error(error);
    }
};

export const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.querySelector('#signup__firstname').value;
    const lastName = form.querySelector('#signup__lastname').value;
    const login = form.querySelector('#signup__login').value;
    const password = form.querySelector('#signup__password').value;

    checkRequest({
        first_name: firstName,
        last_name: lastName,
        login,
        password,
    });
};
