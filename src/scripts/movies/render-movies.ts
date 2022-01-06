import { domElements } from './global-var';
import { URL_IMG, NO_MORE, CLASS_LOADER } from '../constants';
import { formatRuntime, formatRate, getRateState } from './helpers';
import { TMovie } from './types';

const htmlToElement = (html: string): ChildNode => {
    const template: HTMLTemplateElement = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

const getMovieCard = ({
    id, title, runtime, backdrop_path: backdropPath, movie_rate: movieRate,
}: TMovie): ChildNode => {
    const html: string = domElements.filmItemTemplate
        .replace('{{movieId}}', `${id}`)
        .replace('{{title}}', title)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{backdropPath}}', URL_IMG + backdropPath)
        .replace('{{typeRate}}', getRateState(movieRate))
        .replace('{{movieRate}}', formatRate(movieRate));
    return htmlToElement(html);
};

const addMovieCard = (movie: TMovie): void => {
    domElements.movieList.append(getMovieCard(movie));
};

export const renderPage = (movies: Array<TMovie>): void => {
    movies.forEach(addMovieCard);
};

export const disableLoadMoreBtn = (state: boolean): void => {
    domElements.loadMoreBtn.disabled = state;
};

export const removeListenerFromLoadBtn = (listener: { (): Promise<void>; (this: HTMLButtonElement, ev: MouseEvent): any; }): void => {
    disableLoadMoreBtn(true);
    domElements.loadMoreBtn.removeEventListener('click', listener);
    domElements.loadMoreBtn.textContent = NO_MORE;
};

export const showLoader = (): void => {
    disableLoadMoreBtn(true);
    domElements.loadMoreBtn.classList.add(CLASS_LOADER);
};

export const hideLoader = (): void => {
    disableLoadMoreBtn(false);
    domElements.loadMoreBtn.classList.remove(CLASS_LOADER);
};
