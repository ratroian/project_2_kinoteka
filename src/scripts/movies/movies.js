import { domElements } from './global-var';
import { clearPagesFromLocalStorage } from './helpers';
import { checkAuthorization, getNextPage } from './requests';
import handleFilters from './filters';
import FilterRange from './FilterRange';
import { MOVIE_PAGE_URL } from '../constants';

new FilterRange('budget');
new FilterRange('popularity');
new FilterRange('revenue');

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};

function openFilmCard(event) {
    const movieId = Number(event.target.closest('.card')?.dataset.movieid);
    if (!movieId) return;
    window.open(`${MOVIE_PAGE_URL}#${movieId}`);
}

domElements.movieList.addEventListener('click', openFilmCard);
window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);
domElements.filterBtn.addEventListener('click', handleFilters);
