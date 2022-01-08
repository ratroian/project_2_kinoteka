import { clearPagesFromLocalStorage } from './helpers';
import { MOVIE_PAGE_URL } from '../constants';

export const handleLogOut = (event: Event & { target: HTMLAnchorElement }): void => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};

export const openFilmCard = (event: Event & { target: HTMLElement }): void => {
    const movieCard: HTMLElement = event.target.closest('.card');
    if (!movieCard) return;
    const movieId = Number(movieCard.dataset.movieid);
    window.open(`${MOVIE_PAGE_URL}#${movieId}`);
};
