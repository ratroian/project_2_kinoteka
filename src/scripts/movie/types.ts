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

export type TGenre = {
    id?: number,
    name?: string,
};

export type TGenres = Array<TGenre>;

export type TGenresResponse = {
    genres: TGenres,
};

export type TAnchorEvent = Event & { target: HTMLAnchorElement };
