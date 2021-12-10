import axios from "axios";
import {showMessageError} from "./authorization";

const postSignIn =  async (body) => {
    try {
        const response = await axios.post('https://wowmeup.pp.ua/user/sign_in', body);
        const { headers, data } = response;
        return {id: data.userId, token: headers['access-token']};
    } catch (error) {
        return error;
    }
}

const checkRequestSignIn = async (body) => {
    const responseSignIn = await postSignIn(body);
    if (responseSignIn.token) {
        localStorage.setItem('userData', JSON.stringify(responseSignIn));
        setTimeout(() => {
            window.location.assign('./movies.html');
        }, 1500);
    } else {
        showMessageError()
    }
}

export const handleSubmitFormSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const login = form.querySelector('#signin__login').value;
    const password = form.querySelector('#signin__password').value;

    const body = {
        login: login,
        password: password,
    };

    checkRequestSignIn(body);
}


