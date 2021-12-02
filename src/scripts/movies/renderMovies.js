import { domElements } from "./global-var";
import { URL_IMG } from "../constants";
import { runtimeFormatting, rateFormatting, rateState } from "./helpers";

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

const getMovieCard = (movie) => {
    const html = domElements.filmItemTemplate
        .replace('{{backdrop_path}}', URL_IMG + movie.backdrop_path)
        .replace('{{title}}', movie.title)
        .replace('{{runtime}}', runtimeFormatting(movie.runtime))
        .replace('{{class-rate}}', rateState(movie.movie_rate))
        .replace('{{movie_rate}}', rateFormatting(movie.movie_rate));
    return htmlToElement(html);
}

const addMovieCard = (movie) => {
    domElements.movieList.append(getMovieCard(movie));
}

export const renderPage = (movies) => {
    movies.forEach(addMovieCard);
}

