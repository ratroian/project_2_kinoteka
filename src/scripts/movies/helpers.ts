import {
    MOVIE_ON_PAGE, PER_PAGE, KEY_MOVIES_PAGES, NO_RATE, GOOD_RATE, BAD_RATE,
} from '../constants';
import { TMovies, TMovie } from './types';

export const clearPagesFromLocalStorage = (): void => {
    localStorage.clear();
};

export const loadPageFromLocalStorage = (): TMovies => (
    JSON.parse(localStorage.getItem(KEY_MOVIES_PAGES)) ?? []
);
    
export const savePageToLocalStorage = (value: Array<TMovie>): void => {
    const movies = loadPageFromLocalStorage();
    movies.push(value);
    localStorage.setItem(KEY_MOVIES_PAGES, JSON.stringify(movies));
};

export const getCurrentPageFromApi = (): number => (
    Math.ceil((loadPageFromLocalStorage().length * MOVIE_ON_PAGE) / PER_PAGE)
);

export const saveMovies = (movies:  Array<TMovie>): void => {
    movies.forEach((item, index, array) => {
        if (index % MOVIE_ON_PAGE !== 0) return;
        const page = array.slice(index, index + MOVIE_ON_PAGE);
        savePageToLocalStorage(page);
    });
};

export const formatRuntime = (runtime: number): string => {
    if (typeof runtime !== 'number' || !Number.isFinite(runtime) || runtime < 1) return 'null';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

export const formatRate = (rate: string|null): string => rate || NO_RATE;

export const getRateState = (rate: string|null): string => {
    if (rate === null) return BAD_RATE;
    const rateToNumber = Number(rate);
    if (!Number.isFinite(rateToNumber) || rateToNumber < 7) return BAD_RATE;
    return GOOD_RATE;
};

export const scrollToDownPage = (): void => {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
    });
};
