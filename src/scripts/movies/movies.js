import axios from "axios";
import { domElements, globalVar } from "./global-var";
import { renderPage } from "./renderMovies";
import { URL_MOVIE, MOVIE_ON_PAGE } from "../constants";
import { savePageToLocalStorage, clearPagesFromLocalStorage, loadPageFromLocalStorage } from "./helpers";

const getMoviesFromPage = async (page = 1) => {
    try {
        const response = await axios.get(`${URL_MOVIE}?page=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


const saveMovies = (movies) => {
    movies.forEach((item, index, array) => {
        if (index % MOVIE_ON_PAGE !== 0) return;
        const page = array.slice(index, index + MOVIE_ON_PAGE);
        savePageToLocalStorage(globalVar.countPages++, page);
    });
}

const getMovies = async () => {
    try {
        console.log('Loading movies...');
        const page = await getMoviesFromPage(globalVar.pageFromApi++);
        const nextPage = await getMoviesFromPage(globalVar.pageFromApi++);
        if (page.movies.length === 0) throw new Error('Movies is end!');
        const movies = [...page.movies, ...nextPage.movies];
        saveMovies(movies);
    } finally {
        console.log('Done!');
    }
}

const renderNextPage = async () => {
    try {
        const movies = loadPageFromLocalStorage(globalVar.currentPage++);
        if (movies) {
            renderPage(movies);
            return;
        }
        globalVar.currentPage--;
        await getMovies();
        await renderNextPage();
    } catch (error) {
        domElements.loadMoreBtn.disabled = true;
        domElements.loadMoreBtn.removeEventListener('click', renderNextPage);
    }
}

const initMovies = async () => {
    try {
        clearPagesFromLocalStorage();
        await getMovies();
        await renderNextPage();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', initMovies);
domElements.loadMoreBtn.addEventListener('click', renderNextPage);