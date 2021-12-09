import {
    MOVIE_ON_PAGE, PER_PAGE, KEY_MOVIES_PAGES, NO_RATE, GOOD_RATE, BAD_RATE,
} from '../constants';

export const clearPagesFromLocalStorage = () => {
    localStorage.clear();
};

export const savePageToLocalStorage = (value) => {
    const movies = loadPageFromLocalStorage();
    movies.push(value);
    localStorage.setItem(KEY_MOVIES_PAGES, JSON.stringify(movies));
};

export const saveMovies = (movies) => {
    movies.forEach((item, index, array) => {
        if (index % MOVIE_ON_PAGE !== 0) return;
        const page = array.slice(index, index + MOVIE_ON_PAGE);
        savePageToLocalStorage(page);
    });
};

export const loadPageFromLocalStorage = () => (
    JSON.parse(localStorage.getItem(KEY_MOVIES_PAGES)) ?? []
);

export const getCurrentPageFromApi = () => (
    Math.ceil((loadPageFromLocalStorage().length * MOVIE_ON_PAGE) / PER_PAGE)
);

export const formatRuntime = (runtime) => {
    if (typeof runtime !== 'number' || !Number.isFinite(runtime) || runtime < 1) return 'null';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

export const formatRate = (rate) => rate || NO_RATE;

export const getRateState = (rate) => {
    if (rate === null) return BAD_RATE;
    rate = Number(rate);
    if (!Number.isFinite(rate) || rate < 7) return BAD_RATE;
    return GOOD_RATE;
};

export const scrollToDownPage = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
    });
};
