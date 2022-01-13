import axios from 'axios';
import { TLogin, TUserData, TFormSignIn } from './types';
import * as constants from '../constants';
import * as helpers from './helpers';
import domElements from './global-var';

const postSignIn = async (body: TLogin): Promise<TUserData> => {
    try {
        helpers.setButtonLoader(domElements.signInButton);
        const response = await axios.post(constants.URL_SIGN_IN, body);
        const { data, headers } = response;
        return { id: data.id, token: headers.token };
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

const isValidFormSignIn = ({ login, password }: TFormSignIn): boolean => {
    const { status: loginStatus, message: loginMessage } = helpers.isValidLogin(login.value);
    const { status: passwordStatus, message: passwordMessage } = helpers.isValidPassword(password.value);

    helpers.removeClassToElement(login);
    helpers.removeClassToElement(password);

    switch (false) {
        case loginStatus:
            helpers.showMessageValidation(login, loginMessage);
            return false;
        case passwordStatus:
            helpers.showMessageValidation(password, passwordMessage);
            return false;
        default:
            return true;
    }
};

const handleSubmitFormSignIn = async (event: Event & { target: HTMLFormElement }): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.target;
    const login: HTMLInputElement = (form.querySelector('#signin__login') as HTMLInputElement);
    const password: HTMLInputElement = (form.querySelector('#signin__password') as HTMLInputElement);

    if (!isValidFormSignIn({ login, password })) return;

    await checkRequestSignIn({
        login: login.value,
        password: password.value,
    });
};

export default handleSubmitFormSignIn;
