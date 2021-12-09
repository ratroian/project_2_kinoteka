import { domElements, globalVar } from '../movies/global-var';
import { URL_IMG } from '../constants';
import { formatRuntime, formatRate, loadPageFromLocalStorage } from '../movies/helpers';

globalVar.movieId = localStorage.getItem('movieId');
// KEY_MOVIES_PAGES = localStorage.getItem('moviesPages');
const moviesArr = loadPageFromLocalStorage();
const allLoadedFilms = [].concat(...moviesArr);
const infoAboutFilm = allLoadedFilms.find((entry) => entry.id === Number(globalVar.movieId));

const htmlToElement = (html) => {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template;
};

console.log('[htmlToElement]', htmlToElement);

const getMovieDescription = ({
    title,
    backdrop_path: backdropPath,
    adult,
    runtime,
    movie_rate: movieRate,
    overview,
    // genre_ids: genreIds,
} = {}) => {
    const html = domElements.movieTemplate
        .replace('{{title}}', title)
        .replace('{{backdrop_path}}', URL_IMG + backdropPath)
        .replace('{{adult}}', adult)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{movie_rate}}', formatRate(movieRate))
        .replace('{{overview}}', overview);
        // .replace('{{genreIds}}', genreIds);
    return htmlToElement(html);
};

const addMovieDescription = (obj) => {
    domElements.movieWrapper.append(getMovieDescription(obj));
};

addMovieDescription(infoAboutFilm);
