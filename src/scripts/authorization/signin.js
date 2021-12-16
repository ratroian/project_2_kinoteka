import axios from 'axios';
import showMessageError from './helpers';
import * as constants from '../constants';
import * as helpers from './helpers';
import domElements from './global-var';

const postSignIn = async (body) => {
    try {
        helpers.setButtonLoader(domElements.signInButton);
        const response = await axios.post(constants.URL_SIGN_IN, body);
        const { headers, data } = response;
        return { id: data.userId, token: headers[constants.ACCESS_TOKEN] };
    } catch (error) {
        return error;
    } finally {
        helpers.removeButtonLoader(domElements.signInButton);
    }
};

const checkRequestSignIn = async (body) => {
    const responseSignIn = await postSignIn(body);
    if (responseSignIn.token) {
        localStorage.setItem(constants.KEY_USER_DATA, JSON.stringify(responseSignIn));
        setTimeout(() => {
            window.location.assign(constants.MOVIES_PAGE_URL);
        }, 250);
    } else {
        showMessageError(constants.MESSAGE_ERROR);
    }
};

const handleSubmitFormSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const login = form.querySelector('#signin__login').value;
    const password = form.querySelector('#signin__password').value;

    checkRequestSignIn({
        login,
        password,
    });
};

export default handleSubmitFormSignIn;
