import { domElements } from './global-var';
import { checkAuthorization, getNextPage } from './requests';
import handleFilters from './filters-constructor';
import { handleLogOut, openFilmCard } from './listeners';

domElements.movieList.addEventListener('click', openFilmCard);
window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);
domElements.filterBtn.addEventListener('click', handleFilters);
