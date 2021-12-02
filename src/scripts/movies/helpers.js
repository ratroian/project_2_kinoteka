import { MOVIE_ON_PAGE, PER_PAGE } from "../constants";

export const clearPagesFromLocalStorage = () => {
   localStorage.clear();
}

export const savePageToLocalStorage = (value) => {
    const movies = loadPageFromLocalStorage();
    movies.push(value);
    localStorage.setItem('moviesPage', JSON.stringify(movies));
}

export const loadPageFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('moviesPage')) ?? [];
}

export const getCurrentPageFromApi = () => {
    return Math.ceil(loadPageFromLocalStorage().length * MOVIE_ON_PAGE / PER_PAGE);
}

export const runtimeFormatting = (runtime) => {
    if (typeof runtime !== 'number' || !isFinite(runtime) || runtime < 1) return 'null';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    return `${hours}h ${minutes}m`;
}

export const rateFormatting = (rate) => {
    if (rate === null) return 'NR';
    return rate;
}

export const rateState = (rate) => {
    if (rate === null) return 'bad-rate';
    rate = Number(rate);
    if (!isFinite(rate) || rate < 7) return 'bad-rate';
    return 'good-rate';
}

export const scrollToDown = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
    });
}