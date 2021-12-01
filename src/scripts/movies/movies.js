import { URL_MOVIE } from "../constants";
import axios from "axios";

let pageFromApi = 1;

async function getMovies(page = 1) {
    const response = await axios.get(`${URL_MOVIE}?page=${page}`);
    return response.data;
}

async function saveMovies() {
    const page = await getMovies(pageFromApi++);
    const nextPage = await getMovies(pageFromApi++);
    console.log(page, nextPage);
}

saveMovies();