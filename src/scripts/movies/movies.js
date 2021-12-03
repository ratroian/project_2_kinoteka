import axios from "axios";
import { domElements, globalVar } from "./global-var";
import { renderPage } from "./renderMovies";
import { URL_MOVIE, MOVIE_ON_PAGE, PER_PAGE } from "../constants";
import { savePageToLocalStorage, clearPagesFromLocalStorage,
         loadPageFromLocalStorage, scrollToDown, disableLoadMoreBtn, removeListenerFromLoadBtn } from "./helpers";

const getMoviesFromAPI = async (page = 1) => {
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

const getMovies = async () => {
    try {
        disableLoadMoreBtn(true);
        domElements.loadMoreBtn.classList.add('loader');
        const page = await getMoviesFromAPI(++globalVar.pageFromApi);
        if (page.movies.length === 0) throw new Error();
        saveMovies(page.movies);
    } finally {
        disableLoadMoreBtn(false);
        domElements.loadMoreBtn.classList.remove('loader');
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
        removeListenerFromLoadBtn(getNextPage);
    } finally {
        setTimeout(scrollToDown, 200);
    }
}

const checkAuthorization = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('userData'))?.token;
        if (!token) {
            window.location.href = './index.html';
            return;
        }
        await getNextPage();
        disableLoadMoreBtn(false);
    } catch (error) {
        console.log(error);
    }
}

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.href = event.target.href;
}

window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);