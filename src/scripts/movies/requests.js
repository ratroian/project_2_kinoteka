import axios from 'axios';
import * as helpers from './helpers';
import { domElements, globalVar } from './global-var';
import { disableLoadMoreBtn, removeListenerFromLoadBtn, renderPage } from './render-movies';
import { PER_PAGE, URL_MOVIE } from '../constants';

export const getMoviesFromAPI = async (page = 1) => {
    try {
        const response = await axios.get(`${URL_MOVIE}?page=${page}&per_page=${PER_PAGE}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getMovies = async () => {
    try {
        disableLoadMoreBtn(true);
        domElements.loadMoreBtn.classList.add('loader');
        const page = await getMoviesFromAPI(++globalVar.pageFromApi);
        if (page.movies.length === 0) throw new Error('Not found movies');
        helpers.saveMovies(page.movies);
    } finally {
        disableLoadMoreBtn(false);
        domElements.loadMoreBtn.classList.remove('loader');
    }
};

export const getNextPage = async () => {
    try {
        const movies = helpers.loadPageFromLocalStorage();
        const page = movies[globalVar.currentPage++];
        if (page) {
            renderPage(page);
            return;
        }
        globalVar.currentPage--;
        await getMovies();
        await getNextPage();
    } catch (error) {
        removeListenerFromLoadBtn(getNextPage);
    } finally {
        setTimeout(helpers.scrollToDownPage, 200);
    }
};

export const checkAuthorization = async () => {
    try {
        const { token } = JSON.parse(localStorage.getItem('userData')) || {};
        if (!token) {
            window.location.assign('./index.html');
            return;
        }
        await getNextPage();
        disableLoadMoreBtn(false);
    } catch (error) {
        console.error(error.message);
    }
};
