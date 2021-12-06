import { domElements } from './global-var';
import { URL_IMG, NO_MORE } from '../constants';
import { runtimeFormatting, rateFormatting, rateState } from './helpers';

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
        .replace('{{movie_id}}', id)
        .replace('{{title}}', title)
        .replace('{{runtime}}', runtimeFormatting(runtime))
        .replace('{{backdrop_path}}', URL_IMG + backdropPath)
        .replace('{{type_rate}}', rateState(movieRate))
        .replace('{{movie_rate}}', rateFormatting(movieRate));
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
