import { domElements } from './global-var';
import {
    URL_IMG, NO_MORE, CLASS_LOADER, LOAD_MORE,
} from '../constants';
import { formatRuntime, formatRate, getRateState } from './helpers';
import { TMovie } from './types';

const createElementFromHtml = (html: string): ChildNode => {
    const template: HTMLTemplateElement = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

const getMovieCard = ({
    id, title, runtime, backdrop_path: backdropPath, vote_average: movieRate,
}: TMovie): ChildNode => {
    const html: string = domElements.filmItemTemplate
        .replace('{{movieId}}', `${id}`)
        .replace('{{title}}', title)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{backdropPath}}', URL_IMG + backdropPath)
        .replace('{{typeRate}}', getRateState(`${movieRate}`))
        .replace('{{movieRate}}', formatRate(movieRate));
    return createElementFromHtml(html);
};

const addMovieCard = (movie: TMovie): void => {
    domElements.movieList.append(getMovieCard(movie));
};

export const renderPage = (movies: Array<TMovie>): void => {
    movies.forEach(addMovieCard);
};

export const disableLoadMoreBtn = (state: boolean): void => {
    domElements.loadMoreBtn.disabled = state;
    domElements.loadMoreBtn.textContent = state ? NO_MORE : LOAD_MORE;
};

export const showLoader = (): void => {
    disableLoadMoreBtn(true);
    domElements.loadMoreBtn.classList.add(CLASS_LOADER);
};

export const hideLoader = (): void => {
    disableLoadMoreBtn(false);
    domElements.loadMoreBtn.classList.remove(CLASS_LOADER);
};
