import axios from "axios";
import { domElements, globalVar } from "./global-var";
import { renderPage } from "./renderMovies";
import { URL_MOVIE, MOVIE_ON_PAGE, PER_PAGE } from "../constants";
import { savePageToLocalStorage, clearPagesFromLocalStorage, loadPageFromLocalStorage, scrollToDown } from "./helpers";

const getMoviesFromPage = async (page = 1) => {
    try {
        const response = await axios.get(`${URL_MOVIE}?page=${page}&per_page=${PER_PAGE}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const saveMovies = (movies) => {
    movies.forEach((item, index, array) => {
        if (index % MOVIE_ON_PAGE !== 0) return;
        const page = array.slice(index, index + MOVIE_ON_PAGE);
        savePageToLocalStorage(page);
    });
}

const disableLoadMoreBtn = (state) => {
    domElements.loadMoreBtn.disabled = state;
}

const getMovies = async () => {
    try {
        console.log('Loading movies...');
        disableLoadMoreBtn(true);
        const page = await getMoviesFromPage(++globalVar.pageFromApi);
        if (page.movies.length === 0) throw new Error('Movies is end!');
        saveMovies(page.movies);
    } finally {
        console.log('Done!');
        disableLoadMoreBtn(false);
    }
}

const getNextPage = async () => {
    try {
        const movies = loadPageFromLocalStorage();
        const page = movies[globalVar.currentPage++];
        if (page) {
            renderPage(page);
            return;
        }
        globalVar.currentPage--;
        await getMovies();
        await getNextPage();
    } catch (error) {
        disableLoadMoreBtn(true);
        domElements.loadMoreBtn.removeEventListener('click', getNextPage);
    } finally {
        setTimeout(scrollToDown, 200);
    }
}

const initMovies = async () => {
    try {
        await getNextPage();
    } catch (error) {
        console.log(error);
    }
}

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.href = event.target.href;
}

window.addEventListener('load', initMovies);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);