import axios from 'axios';
import { TUserSignUp } from './types';
import * as constants from '../constants';
import * as helpers from './helpers';
import domElements from './global-var';

const postSignUp = async (body: TUserSignUp): Promise<number> => {
    try {
        helpers.setButtonLoader(domElements.signUpButton);
        const response = await axios.post(constants.URL_SIGN_UP, body);
        return response.status;
    } catch (error) {
        const { data } = error.response;
        if (data?.includes(constants.EXIST_MESSAGE)) {
            helpers.showMessageError(constants.USER_ALREADY);
        } else {
            helpers.showMessageError(constants.STATUS_REGISTRATION_BAD);
        }
        return error;
    } finally {
        helpers.removeButtonLoader(domElements.signUpButton);
    }
};

const checkRequest = async (body: TUserSignUp): Promise<void> => {
    const responseStatus: number = await postSignUp(body);
    if (responseStatus === 201) {
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
