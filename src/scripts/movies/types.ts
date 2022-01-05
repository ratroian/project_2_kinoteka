export type TDomElements = {
    filmItemTemplate: string,
    movieList: HTMLElement,
    loadMoreBtn: HTMLButtonElement,
    logOutBtn: HTMLButtonElement,
    filterBtn: HTMLButtonElement,
    filterModalBox: HTMLElement,
    releaseDateFirst: HTMLElement,
    releaseDateLast: HTMLElement,
};

export type TGlobalVar = {
    pageFromApi: number,
    currentPage: number,
};

export type TGenreIds = Array<number>;
export type TMovie = {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genre_ids: TGenreIds,
    homepage: string,
    id: number,
    imdb_id: string,
    movie_rate: null|string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    title: string,
};

export type TResponseData = {
    totalCount: number,
    movies: Array<TMovie>,
    currentPage: number,
};

export type TMovies = Array<Array<TMovie>>;

export type TUserData = {
    userId: number,
    token: string,
};
