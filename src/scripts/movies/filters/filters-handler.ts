import { URL_MOVIE, KEY_MOVIES_PAGES } from '../../constants';
import { domElements, globalVar } from '../global-var';
import { toggleClassFilters } from '../filters-constructor';
import { getNextPage } from '../requests';
import { disableLoadMoreBtn } from '../render-movies';

const form: HTMLFormElement = document.querySelector('#filters');
const disabledButton: HTMLButtonElement = document.querySelector('#reset-btn');
const filterButton: HTMLButtonElement = document.querySelector('#filter-btn');
const formItems: NodeListOf<HTMLFormElement> = form.querySelectorAll('[data-url]');

const getUrl = (): string => {
    let result = `${URL_MOVIE}?`;
    formItems.forEach((element) => {
        if (element.value !== '') {
            result += `&${element.dataset.url}=${element.value.replace(/,/g, '').replace(/ /g, '%20')}`;
        }
    });
    return result;
};

const formSubmitHandler = (event: Event & { target: HTMLElement }): void => {
    event.preventDefault();
    globalVar.currentPage = 0;
    domElements.movieList.innerHTML = '';
    toggleClassFilters();
    localStorage.setItem('isFiltersApply', 'true');
    localStorage.setItem('filtersURL', getUrl());
    localStorage.removeItem(KEY_MOVIES_PAGES);
    disableLoadMoreBtn(false);
    getNextPage();
    disabledButton.disabled = false;
    filterButton.classList.add('filter-active');
};

const formResetHandler = (): void => {
    localStorage.removeItem('isFiltersApply');
    localStorage.removeItem('filtersURL');
    localStorage.removeItem(KEY_MOVIES_PAGES);
    domElements.movieList.innerHTML = '';
    globalVar.currentPage = 0;
    toggleClassFilters();
    getNextPage();
    disabledButton.disabled = true;
    filterButton.classList.remove('filter-active');
};

form.addEventListener('submit', formSubmitHandler);
form.addEventListener('reset', formResetHandler);
