import axios from 'axios';
import { domElements, globalVar } from './global-var';
import { URL_GENRES, URL_IMG, CLASS_HIDDEN } from '../constants';
import {
    clearPagesFromLocalStorage,
    formatRate,
    formatRuntime,
    loadPageFromLocalStorage,
} from '../movies/helpers';

export const removePageLoader = () => {
    domElements.loaderFullScreen.classList.toggle(CLASS_HIDDEN);
};

export function getInfoAboutFilm() {
    const moviesArr = loadPageFromLocalStorage();
    const allLoadedFilms = [].concat(...moviesArr);
    return allLoadedFilms.find((entry) => entry.id === Number(globalVar.movieId));
}

export const htmlToElement = (html) => {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content;
};

const getMovieDescription = ({
    title,
    backdrop_path: backdropPath,
    adult,
    runtime,
    movie_rate: movieRate,
    overview,
} = {}) => {
    const html = domElements.movieTemplate
        .replace('{{title}}', title)
        .replace('{{backdropPath}}', URL_IMG + backdropPath)
        .replace('{{adult}}', adult)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{movieRate}}', formatRate(movieRate))
        .replace('{{overview}}', overview);
    return htmlToElement(html);
};

const addMovieDescription = (obj) => {
    domElements.movieWrapper.append(getMovieDescription(obj));
};

const getGenresFromAPI = async () => {
    try {
        const response = await axios.get(URL_GENRES);
        return response.data;
    } catch (error) {
        return error;
    }
};

const getGenreCard = (elem) => {
    const html = domElements.genreTemplate.replace('{{genreIds}}', elem);
    return htmlToElement(html);
};

const addGenreCard = (titleGenre) => {
    const genresWrapper = document.querySelector('#genres');
    genresWrapper.append(getGenreCard(titleGenre));
};

const renderGenres = (genresList) => {
    genresList.forEach(addGenreCard);
};

function getArray(genres) {
    const info = getInfoAboutFilm();
    const arrayGenres = [];
    info.genre_ids.forEach((elem) => {
        const genre = genres.find((obj) => obj.id === elem);
        if (genre && !arrayGenres.includes(genre.name)) {
            arrayGenres.push(genre.name);
        }
    });
    renderGenres(arrayGenres);
}

const getArrayGenres = async () => {
    const genresFromAPI = await getGenresFromAPI();
    const { genres } = genresFromAPI;
    getArray(genres);
};

const handleLoadWindow = async () => {
    globalVar.movieId = Number(window.location.hash.slice(1));
    addMovieDescription(getInfoAboutFilm());
    await getArrayGenres();
    removePageLoader();
};

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};

domElements.logOutBtn.addEventListener('click', handleLogOut);
window.addEventListener('load', handleLoadWindow);
