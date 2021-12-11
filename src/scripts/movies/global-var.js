import { getCurrentPageFromApi } from './helpers';

export const domElements = {
    filmItemTemplate: document.querySelector('#filmItemTemplate').innerHTML,
    movieList: document.querySelector('#movie-list'),
    loadMoreBtn: document.querySelector('#load-more'),
    logOutBtn: document.querySelector('#log-out'),
    filterBtn: document.querySelector('#filter-btn'),
    filterModalBox: document.querySelector('#filters-modal'),
    releaseDateFirst: document.querySelector('#release-date-first'),
    releaseDateLast: document.querySelector('#release-date-last'),
};

export const globalVar = {
    pageFromApi: getCurrentPageFromApi(),
    currentPage: 0,
};
