import axios from 'axios';
import { globalVar, domElements } from './global-var';
import { URL_IMG, URL_GENRES } from '../constants';
import {
    formatRuntime,
    formatRate,
    loadPageFromLocalStorage,
} from '../movies/helpers';

globalVar.movieId = localStorage.getItem('movieId');

export function getInfoAboutFilm() {
    const moviesArr = loadPageFromLocalStorage();
    const allLoadedFilms = [].concat(...moviesArr);
    const infoAboutFilm = allLoadedFilms.find((entry) => entry.id === Number(globalVar.movieId));
    return infoAboutFilm;
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
        .replace('{{backdrop_path}}', URL_IMG + backdropPath)
        .replace('{{adult}}', adult)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{movie_rate}}', formatRate(movieRate))
        .replace('{{overview}}', overview);
    return htmlToElement(html);
};

const addMovieDescription = (obj) => {
    console.log('[domElements.movieWrapper]', domElements.movieWrapper);
    domElements.movieWrapper.append(getMovieDescription(obj));
};

addMovieDescription(getInfoAboutFilm());

const getGenresFromAPI = async () => {
    try {
        const response = await axios.get(URL_GENRES);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {};
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

getArrayGenres();
