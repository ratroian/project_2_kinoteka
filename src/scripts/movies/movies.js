import { URL_MOVIE, MOVIE_ON_PAGE } from "../constants";
import { savePageToLocalStorage, clearPagesFromLocalStorage } from "./helpers";
import axios from "axios";

let pageFromApi = 1;
let countPage = 1;

async function getMoviesFromPage(page = 1) {
    const response = await axios.get(`${URL_MOVIE}?page=${page}`);
    return response.data;
}

async function saveMovies() {
    const page = await getMoviesFromPage(pageFromApi++);
    const nextPage = await getMoviesFromPage(pageFromApi++);
    const movies = [...page.movies, ...nextPage.movies];
    movies.forEach((item, index, array) => {
        if (index % MOVIE_ON_PAGE !== 0) return;
        const page = array.slice(index, index + MOVIE_ON_PAGE);
        savePageToLocalStorage(countPage++, page);
    });
}

async function initMovies() {
    clearPagesFromLocalStorage();
    await saveMovies();
}

window.addEventListener('load', initMovies);

