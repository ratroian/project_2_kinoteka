import { domElements, globalVar } from './global-var';
import { clearPagesFromLocalStorage } from './helpers';
import { checkAuthorization, getNextPage } from './requests';

const handleLogOut = (event) => {
    event.preventDefault();
    clearPagesFromLocalStorage();
    window.location.assign(event.target.href);
};

domElements.movieList.addEventListener('click', openFilmCard);
function openFilmCard(event) {
    globalVar.movieId = Number(event.target.closest('.card').dataset.movieId);
    localStorage.setItem('movieId', globalVar.movieId);
    window.open(`./movie.html#${globalVar.movieId}`);
}

window.addEventListener('load', checkAuthorization);
domElements.loadMoreBtn.addEventListener('click', getNextPage);
domElements.logOutBtn.addEventListener('click', handleLogOut);
