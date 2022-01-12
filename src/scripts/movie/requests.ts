import axios from 'axios';
import { TMovieData } from './types';
import { URL_MOVIE_DATA } from '../constants';

export const getMovieData = async (id: number): Promise<TMovieData> => {
    try {
        const response = await axios.get<TMovieData>(`${URL_MOVIE_DATA}${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
