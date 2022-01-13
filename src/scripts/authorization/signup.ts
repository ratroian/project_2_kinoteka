import axios from 'axios';
import { TUserSignUp, TFormSignUp } from './types';
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

const isValidFormSignUp = ({
    login, password, lastName, firstName,
}: TFormSignUp): boolean => {
    const { status: firstNameStatus, message: firstNameMessage } = helpers.isValidName(firstName.value);
    const { status: lastNameStatus, message: lastNameMessage } = helpers.isValidName(lastName.value);
    const { status: loginStatus, message: loginMessage } = helpers.isValidLogin(login.value);
    const { status: passwordStatus, message: passwordMessage } = helpers.isValidPassword(password.value);

    helpers.removeClassToElement(firstName);
    helpers.removeClassToElement(lastName);
    helpers.removeClassToElement(login);
    helpers.removeClassToElement(password);

    switch (false) {
        case firstNameStatus:
            helpers.showMessageValidation(firstName, firstNameMessage);
            return false;
        case lastNameStatus:
            helpers.showMessageValidation(lastName, lastNameMessage);
            return false;
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

const handleSubmitFormSignUp = async (event: Event & { target: HTMLFormElement }): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.target;
    const firstName: HTMLInputElement = (form.querySelector('#signup__firstname') as HTMLInputElement);
    const lastName: HTMLInputElement = (form.querySelector('#signup__lastname') as HTMLInputElement);
    const login: HTMLInputElement = (form.querySelector('#signup__login') as HTMLInputElement);
    const password: HTMLInputElement = (form.querySelector('#signup__password') as HTMLInputElement);

    if (!isValidFormSignUp({
        login,
        password,
        firstName,
        lastName,
    })) return;

    await checkRequest({
        first_name: firstName.value,
        last_name: lastName.value,
        login: login.value,
        password: password.value,
    });
};

export default handleSubmitFormSignUp;
