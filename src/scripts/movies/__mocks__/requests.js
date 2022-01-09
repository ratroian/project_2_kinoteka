import * as helpers from '../helpers';
import { domElements, globalVar } from '../global-var';
import { disableLoadMoreBtn, removeListenerFromLoadBtn, renderPage } from '../render-movies';

export const getMoviesFromAPI = () => {
    const movies = new Array(40);
    movies.fill(
        {
            id: 55,
            adult: false,
            backdrop_path: '/5qtOVAcBFogwktkseoZSfZVq6bx.jpg',
            budget: 0,
            homepage: '',
            imdb_id: 'tt0044741',
            original_language: 'ja',
            original_title: '生きる',
            overview: 'Kanji Watanabe is a middle-aged man who has worked in the same monotonous bureaucratic'
                + ' position for decades.'
                + ' Learning he has cancer, he starts to look for the meaning of his life.',
            popularity: 13.112,
            poster_path: '/dgNTS4EQDDVfkzJI5msKuHu2Ei3.jpg',
            release_date: '1952-10-09T00:00:00.000Z',
            revenue: 55240,
            runtime: 143,
            status: 'Released',
            tagline: 'A big story of a little man which will grip your soul ...',
            title: 'Ikiru',
            genre_ids: [
                7,
            ],
            movie_rate: null,
        },
    );
    return movies;
};

export const getMovies = () => {
    try {
        disableLoadMoreBtn(true);
        domElements.loadMoreBtn.classList.add('loader');
        const page = getMoviesFromAPI();
        if (page.length === 0) throw new Error('Not found movies');
        helpers.saveMovies(page);
    } finally {
        disableLoadMoreBtn(false);
        domElements.loadMoreBtn.classList.remove('loader');
    }
};

export const getNextPage = () => {
    try {
        const movies = helpers.loadPageFromLocalStorage();
        const page = movies[globalVar.currentPage++];
        if (page) {
            renderPage(page);
            return;
        }
        globalVar.currentPage--;
        getMovies();
        getNextPage();
    } catch (error) {
        console.error(error.message);
        removeListenerFromLoadBtn(getNextPage);
    }
};

export const checkAuthorization = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.assign('./index.html');
            return;
        }
        getNextPage();
        disableLoadMoreBtn(false);
    } catch (error) {
        console.error(error.message);
    }
};
