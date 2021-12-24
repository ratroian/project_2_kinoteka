import { domElements } from './global-var';
import { clearPagesFromLocalStorage } from './helpers';
import { checkAuthorization, getNextPage } from './requests';
import handleFilters from './filters';
import FilterRange from './FilterRange';
import { MOVIE_PAGE_URL } from '../constants';

new FilterRange('budget');
new FilterRange('popularity');
new FilterRange('revenue');

const handleLogOut = (event: Event & { target: HTMLAnchorElement }) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};

function openFilmCard(event: Event & { target: HTMLElement }) {
    const movieCard: HTMLElement = event.target.closest('.card');
    if (!movieCard) return;
    const movieId = Number(movieCard.dataset.movieid);
    window.open(`${MOVIE_PAGE_URL}#${movieId}`);
}

domElements.movieList.addEventListener('click', openFilmCard);
window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);
domElements.filterBtn.addEventListener('click', handleFilters);
