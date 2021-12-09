import axios from "axios";

const postSignIn =  async (body) => {
    try {
        const response = await axios.post('https://wowmeup.pp.ua/user/sign_in', body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const checkRequestSignIn = async (body) => {
    const responseSignIn = await postSignIn(body);
    if (responseSignIn) {
        localStorage.setItem('userData', JSON.stringify(responseSignIn));
        setTimeout(() => {
            window.location.assign('./movies.html');
        }, 3000);
    }
    console.log(responseSignIn);

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
