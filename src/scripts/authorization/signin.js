import axios from 'axios';
import showMessageError from './helpers';

const postSignIn = async (body) => {
    const btn = document.querySelector('#sign-in-button');
    try {
        btn.classList.add('loader');
        btn.disabled = true;
        const response = await axios.post('https://wowmeup.pp.ua/user/sign_in', body);
        const { headers, data } = response;
        return { id: data.userId, token: headers['access-token'] };
    } catch (error) {
        return error;
    } finally {
        btn.classList.remove('loader');
        btn.disabled = false;
    }
};

const checkRequestSignIn = async (body) => {
    const responseSignIn = await postSignIn(body);
    if (responseSignIn.token) {
        localStorage.setItem('userData', JSON.stringify(responseSignIn));
        setTimeout(() => {
            window.location.assign('./movies.html');
        }, 250);
    } else {
        showMessageError('Login or password is invalid');
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
