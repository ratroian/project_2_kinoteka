import { globalVar } from './global-var';
import { addMovieDescription, renderGenres } from './render';
import { getInfoAboutFilm, getMovieGenres, removePageLoader } from './helpers';
import { clearPagesFromLocalStorage } from '../movies/helpers';
import { TAnchorEvent } from './types';
import { getGenresFromAPI } from './requests';

export const handleLoadWindow = async (): Promise<void> => {
    globalVar.movieId = Number(window.location.hash.slice(1));
    addMovieDescription(getInfoAboutFilm());
    const genres = await getGenresFromAPI();
    renderGenres(getMovieGenres(genres));
    removePageLoader();
};

export const handleLogOut = (event: TAnchorEvent): void => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};
