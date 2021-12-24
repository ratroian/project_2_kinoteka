import axios from 'axios';
import { TLogin, TUserData } from './types';
import * as constants from '../constants';
import * as helpers from './helpers';
import domElements from './global-var';

const postSignIn = async (body: TLogin): Promise<TUserData> => {
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

const checkRequestSignIn = async (body: TLogin): Promise<void> => {
    const responseSignIn: TUserData = await postSignIn(body);
    if (responseSignIn.token) {
        localStorage.setItem(constants.KEY_USER_DATA, JSON.stringify(responseSignIn));
        setTimeout(() => {
            window.location.assign(constants.MOVIES_PAGE_URL);
        }, 250);
    } else {
        helpers.showMessageError(constants.MESSAGE_ERROR);
    }
};

const handleSubmitFormSignIn = async (event: Event & { target: HTMLFormElement }): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.target;
    const login: string = (form.querySelector('#signin__login') as HTMLInputElement).value;
    const password: string = (form.querySelector('#signin__password') as HTMLInputElement).value;
    await checkRequestSignIn({ login, password });
};

export default handleSubmitFormSignIn;
