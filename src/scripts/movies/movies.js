import { domElements } from './global-var';
import { clearPagesFromLocalStorage } from './helpers';
import { checkAuthorization, getNextPage } from './requests';

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.href = event.target.href;
};

window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);
