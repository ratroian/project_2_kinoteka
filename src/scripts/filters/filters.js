import axios from 'axios';
import { URL_MOVIE } from '../constants';
import * as render from '../movies/render-movies';
import * as helpers from '../movies/helpers';

const form = document.querySelector('#filters');
const formItems = form.querySelectorAll('[data-url]');

const getUrl = () => {
    let result = `${URL_MOVIE}?`;
    formItems.forEach((element) => {
        if (element.value !== '') {
            result += `&${element.dataset.url}=${element.value.replace(/,/g, '').replace(/ /g, '%20')}`;
        }
    });
    return result;
};

const getMoviesFromAPIFilter = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return [];
    }
};

const getMovies = async () => {
    try {
        render.showLoader();
        const page = await getMoviesFromAPIFilter(getUrl());
        if (page.movies.length === 0) throw new Error();
        helpers.saveMovies(page.movies);
    } finally {
        render.hideLoader();
    }
};

const formEventHandler = async (event) => {
    event.preventDefault();
    getMovies();
};

form.addEventListener('submit', formEventHandler);
