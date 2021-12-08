import { domElements } from './global-var';
import { clearPagesFromLocalStorage } from './helpers';
import { checkAuthorization, getNextPage } from './requests';
import handleFilters from './filters';
import FilterRange from './FilterRange';

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};

// eslint-disable-next-line no-new
new FilterRange('budget');
// eslint-disable-next-line no-new
new FilterRange('popularity');
// eslint-disable-next-line no-new
new FilterRange('revenue');

window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);
domElements.filterBtn.addEventListener('click', handleFilters);
