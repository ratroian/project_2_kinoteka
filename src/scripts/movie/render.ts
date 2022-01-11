import { domElements } from './global-var';
import { URL_IMG } from '../constants';
import { formatRate, formatRuntime } from '../movies/helpers';
import { TMovie } from '../movies/types';

export const createElementFromHtml = (html: string): ChildNode => {
    const template: HTMLTemplateElement = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

export const getMovieDescription = ({
    title,
    backdrop_path: backdropPath,
    adult,
    runtime,
    vote_average: movieRate,
    overview,
}: TMovie): ChildNode => {
    const html = domElements.movieTemplate
        .replace('{{title}}', title)
        .replace('{{backdropPath}}', URL_IMG + backdropPath)
        .replace('{{adult}}', `${adult}`)
        .replace('{{runtime}}', formatRuntime(runtime))
        .replace('{{movieRate}}', formatRate(movieRate))
        .replace('{{overview}}', overview);
    return createElementFromHtml(html);
};

export const addMovieDescription = (movie: TMovie): void => {
    domElements.movieWrapper.append(getMovieDescription(movie));
};

export const getGenreCard = (genreName: string): ChildNode => {
    const html = domElements.genreTemplate.replace('{{genreName}}', genreName);
    return createElementFromHtml(html);
};

export const addGenreCard = (titleGenre: string, genresWrapper: HTMLDivElement): void => {
    genresWrapper.append(getGenreCard(titleGenre));
};

export const renderGenres = (genresList: Array<string>): void => {
    const genresWrapper: HTMLDivElement = document.querySelector('#genres');
    genresList.forEach((genreName: string): void => addGenreCard(genreName, genresWrapper));
};
