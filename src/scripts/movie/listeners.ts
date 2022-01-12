import { globalVar } from './global-var';
import { addMovieDescription, renderGenres } from './render';
import { removePageLoader } from './helpers';
import { clearPagesFromLocalStorage } from '../movies/helpers';
import { TAnchorEvent } from './types';
import { getMovieData } from './requests';

export const handleLoadWindow = async (): Promise<void> => {
    try {
        globalVar.movieId = Number(window.location.hash.slice(1));
        const movieData = await getMovieData(globalVar.movieId);
        addMovieDescription(movieData);
        renderGenres([...new Set(movieData.name)] as Array<string>);
    } finally {
        removePageLoader();
    }
};

export const handleLogOut = (event: TAnchorEvent): void => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};
