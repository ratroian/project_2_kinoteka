import { domElements, globalVar } from './global-var';
import { CLASS_HIDDEN } from '../constants';
import { loadPageFromLocalStorage } from '../movies/helpers';
import { TMovie, TMovies } from '../movies/types';
import { TGenres } from './types';

export const removePageLoader = (): void => {
    domElements.loaderFullScreen.classList.toggle(CLASS_HIDDEN);
};

export const getInfoAboutFilm = (): TMovie => {
    const moviesArr: TMovies = loadPageFromLocalStorage();
    const allLoadedFilms: Array<TMovie> = [].concat(...moviesArr);
    return allLoadedFilms.find((entry) => entry.id === Number(globalVar.movieId));
};

export const getMovieGenres = (allGenres: TGenres): Array<string> => {
    const { genre_ids: genreIds }: TMovie = getInfoAboutFilm();
    return allGenres
        .filter((genre) => genreIds.includes(genre.id))
        .map((genre) => genre.name);
};
