import { handleSubmitForm } from "./signup";
import { handleSubmitFormSignIn } from "./signin";

const signUpForm = document.querySelector('#form-signup');
const signInForm = document.querySelector('#form-signin');

signUpForm?.addEventListener('submit', handleSubmitForm);
signInForm?.addEventListener('submit', handleSubmitFormSignIn);

const handleLoadWindow = () => {
    if (JSON.parse(localStorage.getItem('userData'))?.token) {
        setTimeout(() => {
            window.location.assign('./movies.html');
        }, 3000);
    }
}

window.addEventListener('load', handleLoadWindow);















// const password = document.querySelector('#signup__password');
// const login = document.querySelector('#signup__login');
// const firstName = document.querySelector('#signup__firstname');
// const lastName = document.querySelector('#signup__lastname');
// const form = document.querySelector('.form');
// const invalidText = document.querySelector('.invalid')



// const resetForm = () => {
//     form.reset();
// };

// const MIN_NAME_LENGTH = 2;
// const MAX_NAME_LENGTH = 25;
// const MIN_PASSWORD_LENGTH = 6;

// const userTextInput = document.querySelector('.');

// form.addEventListener('input', (event) => {
//     let target = event.target;
//     const valueLength = target.value.length;
//     const reg = new RegExp('^[0-9]+$')
//     // console.log(target.closest('.invalid'))
//     // target.classList.remove('error')
//     target.classList.remove('error')
//
//     if (valueLength < MIN_NAME_LENGTH) {
//         target.classList.add('error');
//         // invalidText.textContent = `${  MIN_NAME_LENGTH - valueLength } more characters.`;
//         target.nextElementSibling.textContent = `${  MIN_NAME_LENGTH - valueLength } more characters.`
//
//     } else if (valueLength > MAX_NAME_LENGTH) {
//         target.classList.add('error');
//         // invalidText.textContent = `Remove extra ${  valueLength - MAX_NAME_LENGTH } characters.`;
//         target.nextElementSibling.textContent = `${  MIN_NAME_LENGTH - valueLength } more characters.`
//     }
//     else if (target.classList.contains('input-login') && reg.test(target.value)) {
//         target.classList.add('error');
//         target.nextElementSibling.textContent = 'Login should not consist only of numbers';
//         target.nextElementSibling.textContent = `${  MIN_NAME_LENGTH - valueLength } more characters.`
//     }
//     else if (target.classList.contains('input-password') && valueLength<MIN_PASSWORD_LENGTH) {
//         target.classList.add('error');
//         target.nextElementSibling.textContent = `Password is too short. Min value 6 symbols`;
//     }
//     else {
//         target.setCustomValidity('');
//     }
//
//     // target.reportValidity();
// });


// const jsonData = responseHeaders;
// pm.environment.set("variable_key", responseHeaders["access-token"]);

// postSignUp('123456gg', 'fgfgg', 'Basfdafdaf', 'Fghghfgereh').then(console.log);


// const postSignIn =  async (login, password) => {
//     try {
//         const body = {
//             password: password,
//             login: login
//         };
//         const response = await axios.post('https://wowmeup.pp.ua/user/sign_in', body);
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('id', response.data.userId);
//         window.location.assign('../../movies.html');
//
//     } catch (error) {
//         console.log(error)
//     }
// }
//
//
// const signInForm = document.querySelector('#form-signin');
// signInForm.addEventListener('submit', postSignIn)


