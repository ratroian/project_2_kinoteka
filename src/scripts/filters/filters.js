// import axios from 'axios';
import axios from 'axios';
import { URL_MOVIE } from '../constants';
import * as render from '../movies/render-movies';
// import { globalVar } from '../movies/global-var';
import * as helpers from '../movies/helpers';
// import { getMoviesFromAPI } from '../movies/requests';

const form = document.querySelector('#filters');
const formItems = form.querySelectorAll('[data-url]');

const getUrl = () => {
    let result = `${URL_MOVIE}?`;
    formItems.forEach((element) => {
        if (element.value !== '') {
            result += `&${element.dataset.url}=${element.value.replace(/,/g, '').replace(/ /g, '%20')}`;
        }
    });
    console.log(result);
    return result;
};

const getMoviesFromAPIFilter = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getMovies = async () => {
    try {
        render.showLoader();
        const page = await getMoviesFromAPIFilter('https://wowmeup.pp.ua/movie?popularity_min=0&popularity_max=1000&&budget_min=0&budget_max=800000000&revenue_min=0&revenue_max=200000&title=Hope');
        if (page.movies.length === 0) throw new Error();
        helpers.saveMovies(page.movies);
    } finally {
        render.hideLoader();
    }
};
getMovies();
console.log(getMovies());

const formEventHandler = async (event) => {
    event.preventDefault();
    getUrl();
};

form.addEventListener('submit', formEventHandler);
