import axios from 'axios';
import { TUserSignUp, TSignUp, TMessage } from './types';
import * as constants from '../constants';
import * as helpers from './helpers';
import domElements from './global-var';

const postSignUp = async (body: TUserSignUp): Promise<TSignUp> => {
    try {
        helpers.setButtonLoader(domElements.signUpButton);
        const response = await axios.post(constants.URL_SIGN_UP, body);
        return response.data;
    } catch (error) {
        const { message }: TMessage = error.response.data;
        if (message?.includes(constants.ALREADY_EXIST)) {
            helpers.showMessageError(message);
        } else {
            helpers.showMessageError(constants.STATUS_REGISTRATION_BAD);
        }
        return error;
    } finally {
        helpers.removeButtonLoader(domElements.signUpButton);
    }
};

const checkRequest = async (body: TUserSignUp): Promise<void> => {
    const responseSignUp: TSignUp = await postSignUp(body);
    if (responseSignUp.message === constants.STATUS_REGISTRATION) {
        helpers.showMessageError(constants.STATUS_REGISTRATION);
        setTimeout(() => {
            window.location.assign(constants.INDEX_PAGE_URL);
        }, 1000);
    }
};

const handleSubmitForm = async (event: Event & { target: HTMLFormElement }): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.target;
    const firstName = (form.querySelector('#signup__firstname') as HTMLInputElement).value;
    const lastName = (form.querySelector('#signup__lastname') as HTMLInputElement).value;
    const login = (form.querySelector('#signup__login') as HTMLInputElement).value;
    const password = (form.querySelector('#signup__password') as HTMLInputElement).value;
    await checkRequest({
        first_name: firstName,
        last_name: lastName,
        login,
        password,
    });
};

export default handleSubmitForm;
