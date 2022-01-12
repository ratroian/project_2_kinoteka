export type TDomElements = {
    movieTemplate: string,
    movieWrapper: HTMLDivElement,
    genreTemplate: string,
    genreList: HTMLDivElement,
    logOutBtn: HTMLAnchorElement,
    loaderFullScreen: HTMLDivElement,
};

export type TGlobalVar = {
    movieId: number,
};

export type TAnchorEvent = Event & { target: HTMLAnchorElement };

export type TMovieData = {
    id: number,
    adult: boolean,
    backdrop_path: string,
    budget: number,
    homepage: string,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    status: string,
    title: string,
    vote_average: number,
    vote_count: number,
    runtime: number,
    movie_id: number,
    name: Array<string>,
};
