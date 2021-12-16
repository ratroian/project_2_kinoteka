import { domElements } from './global-var';
import { URL_IMG, NO_MORE, CLASS_LOADER } from '../constants';
import { formatRuntime, formatRate, getRateState } from './helpers';

const htmlToElement = (html) => {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

const getMovieCard = ({
    id, title, runtime, backdrop_path: backdropPath, movie_rate: movieRate,
} = {}) => {
    const html = domElements.filmItemTemplate
        .replace('{{movieId}}', id)
        .replace('{{title}}', title)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{backdropPath}}', URL_IMG + backdropPath)
        .replace('{{typeRate}}', getRateState(movieRate))
        .replace('{{movieRate}}', formatRate(movieRate));
    return htmlToElement(html);
};

const addMovieCard = (movie) => {
    domElements.movieList.append(getMovieCard(movie));
};

export const renderPage = (movies) => {
    movies.forEach(addMovieCard);
};

export const disableLoadMoreBtn = (state) => {
    domElements.loadMoreBtn.disabled = state;
};

export const removeListenerFromLoadBtn = (listener) => {
    disableLoadMoreBtn(true);
    domElements.loadMoreBtn.removeEventListener('click', listener);
    domElements.loadMoreBtn.textContent = NO_MORE;
};

export const showLoader = () => {
    disableLoadMoreBtn(true);
    domElements.loadMoreBtn.classList.add(CLASS_LOADER);
};

export const hideLoader = () => {
    disableLoadMoreBtn(false);
    domElements.loadMoreBtn.classList.remove(CLASS_LOADER);
};
