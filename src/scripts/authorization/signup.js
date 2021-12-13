import axios from 'axios';

export const postSignUp = async (body) => {
    const btn = document.querySelector('#sign-up-button');
    try {
        btn.classList.add('loader');
        btn.disabled = true;
        const response = await axios.post('https://wowmeup.pp.ua/user/sing_up', body);
        return response.data;
    } catch (error) {
        return error;
    } finally {
        btn.classList.remove('loader');
        btn.disabled = false;
    }
};

export const checkRequest = async (body) => {
    try {
        const responseSignUp = await postSignUp(body);
        if (responseSignUp.message === 'Registration successful') {
            setTimeout(() => {
                window.location.href = './index.html';
            }, 250);
        }
        console.log(responseSignUp);
    } catch (error) {
        console.log(error);
    }
};

export const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.querySelector('#signup__firstname').value;
    const lastName = form.querySelector('#signup__lastname').value;
    const login = form.querySelector('#signup__login').value;
    const password = form.querySelector('#signup__password').value;

    const body = {
        first_name: firstName,
        last_name: lastName,
        login,
        password,
    };

    checkRequest(body);
};
