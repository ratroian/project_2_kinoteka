import { TDomElements, TGlobalVar } from './types';

export const domElements: TDomElements = {
    movieTemplate: document.querySelector('#movieTemplate').innerHTML,
    movieWrapper: document.querySelector('.movie-wrapper'),
    genreTemplate: document.querySelector('#genreTemplate').innerHTML,
    genreList: document.querySelector('#genres'),
    logOutBtn: document.querySelector('#log-out'),
    loaderFullScreen: document.querySelector('.loader-full-screen'),
};

export const globalVar: TGlobalVar = {
    movieId: 0,
};
