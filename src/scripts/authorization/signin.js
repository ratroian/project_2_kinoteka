import axios from 'axios';
import showMessageError from './helpers';
import * as constants from '../constants';
import * as helpers from './helpers';

const postSignIn = async (body) => {
    const btn = document.querySelector('#sign-in-button');
    try {
        helpers.setButtonLoader(btn);
        const response = await axios.post(constants.URL_SIGN_IN, body);
        const { headers, data } = response;
        return { id: data.userId, token: headers[constants.ACCESS_TOKEN] };
    } catch (error) {
        return error;
    } finally {
        helpers.removeButtonLoader(btn);
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

    const body = {
        login,
        password,
    };

    checkRequestSignIn(body);
};

export default handleSubmitFormSignIn;
