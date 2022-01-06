import axios from 'axios';
import * as helpers from './helpers';
import { globalVar } from './global-var';
import * as render from './render-movies';
import {
    PER_PAGE, URL_MOVIE, INDEX_PAGE_URL, KEY_USER_DATA,
} from '../constants';
import {
    TResponseData, TMovies, TMovie, TUserData,
} from './types';
import { getCurrentPageFromApi } from './helpers';

const getCurrentUrl = (page) => {
    const filtersURL = localStorage.getItem('filtersURL');
    const isFilters = localStorage.getItem('isFiltersApply') === 'true';
    return (isFilters
        ? `${filtersURL}&page=${page}&per_page=${PER_PAGE}`
        : `${URL_MOVIE}?page=${page}&per_page=${PER_PAGE}`);
};

export const getMoviesFromAPI = async (page = 1): Promise<TResponseData> => {
    const currentUrl = getCurrentUrl(page);
    try {
        const response = await axios.get(currentUrl);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getMovies = async (): Promise<void> => {
    try {
        render.showLoader();
        const page = await getMoviesFromAPI(getCurrentPageFromApi() + 1);
        if (page.movies.length === 0) throw new Error();
        helpers.saveMovies(page.movies);
    } finally {
        render.hideLoader();
    }
};

export const getNextPage = async (): Promise<void> => {
    try {
        const movies: TMovies = helpers.loadPageFromLocalStorage();
        const page: Array<TMovie> = movies[globalVar.currentPage++];
        if (page) {
            render.renderPage(page);
            return;
        }
        globalVar.currentPage--;
        await getMovies();
        await getNextPage();
    } catch {
        render.removeListenerFromLoadBtn(getNextPage);
    } finally {
        setTimeout(helpers.scrollToDownPage, 200);
    }
};

export const checkAuthorization = async (): Promise<void> => {
    try {
        const { token }: TUserData = JSON.parse(localStorage.getItem(KEY_USER_DATA)) || {};
        if (!token) {
            window.location.assign(INDEX_PAGE_URL);
            return;
        }
        await getNextPage();
        render.disableLoadMoreBtn(false);
    } catch (error) {
        console.error(error.message);
    }
};
