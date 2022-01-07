import axios from 'axios';
import { URL_GENRES } from '../constants';
import { TGenres, TGenresResponse } from './types';

export const getGenresFromAPI = async (): Promise<TGenres> => {
    try {
        const response = await axios.get<TGenresResponse>(URL_GENRES);
        return response.data.genres;
    } catch (error) {
        return error;
    }
};
