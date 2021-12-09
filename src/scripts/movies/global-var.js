import { getCurrentPageFromApi } from './helpers';

export const domElements = {
    filmItemTemplate: document.querySelector('#filmItemTemplate').innerHTML,
    // movieTemplate: document.querySelector('#movieTemplate').innerHTML,
    movieList: document.querySelector('#movie-list'),
    loadMoreBtn: document.querySelector('#load-more'),
    logOutBtn: document.querySelector('#log-out'),
    // movieWrapper: document.querySelector('.movie-wrapper'),
};

export const globalVar = {
    pageFromApi: getCurrentPageFromApi(),
    currentPage: 0,
    movieId: 0,
};
