import { URL_MOVIE, KEY_MOVIES_PAGES } from '../constants';
import { domElements, globalVar } from '../movies/global-var';
import { toggleClassFilters } from '../movies/filters';
import { getNextPage } from '../movies/requests';

const form = document.querySelector('#filters');
const disabledButton = document.querySelector('#reset-btn');
const filterButton = document.querySelector('#filter-btn');
const formItems = form.querySelectorAll('[data-url]');

const getUrl = () => {
    let result = `${URL_MOVIE}?`;
    formItems.forEach((element) => {
        if (element.value !== '') {
            result += `&${element.dataset.url}=${element.value.replace(/,/g, '').replace(/ /g, '%20')}`;
        }
    });
    return result;
};

const formSubmitHandler = (event) => {
    event.preventDefault();
    domElements.movieList.innerHTML = '';
    toggleClassFilters();
    localStorage.setItem('isFiltersApply', 'true');
    localStorage.setItem('filtersURL', getUrl());
    globalVar.currentPage = 0;
    localStorage.removeItem(KEY_MOVIES_PAGES);
    domElements.loadMoreBtn.addEventListener('click', getNextPage);
    getNextPage();
    disabledButton.removeAttribute('disabled');
    filterButton.classList.add('filter-active');
};

const formResetHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem('isFiltersApply');
    localStorage.removeItem('filtersURL');
    localStorage.removeItem(KEY_MOVIES_PAGES);
    domElements.movieList.innerHTML = '';
    globalVar.currentPage = 0;
    toggleClassFilters();
    getNextPage();
    disabledButton.setAttribute('disabled', 'disabled');
    filterButton.classList.remove('filter-active');
};

form.addEventListener('submit', formSubmitHandler);
form.addEventListener('reset', formResetHandler);
