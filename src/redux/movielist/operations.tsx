import {
    API_GET_MOVIE_POPULAR,
    API_KEY,
    API_KEY_ALT,
    API_PARAMS_GENRE,
    API_PARAMS_PAGE,
    URL,
    URL_LIST,
    URL_SEARCH,
    API_GET_MOVIE_SIMILAR,
} from '../../api'
import {
    fetchMovie,
    fetchMovieFailure,
    fetchMovieSuccess,
    searchMovie,
    searchMovieSuccess,
    searchMovieFailure,
} from './actions'

export const fetchMovieList = (API_GET_MOVIE_BY = API_GET_MOVIE_POPULAR, genreIDs: number[], page = 1) => {
    const genreParams = genreIDs ? `${API_PARAMS_GENRE}${genreIDs.join('%2C')}` : ''
    return async (dispatch: any) => {
        dispatch(fetchMovie())
        return fetch(`${URL}${API_GET_MOVIE_BY}${API_KEY}${API_PARAMS_PAGE}${page}${genreParams}`)
            .then((response) => response.json())
            .then((json) => dispatch(fetchMovieSuccess(json.results, json.page, json.total_pages)))
            .catch((error) => dispatch(fetchMovieFailure(error)))
    }
}

export const searchMovieList = (keyword: string) => {
    let url = URL_SEARCH + keyword + API_KEY_ALT
    return async (dispatch: any) => {
        dispatch(searchMovie(keyword))
        return fetch(url)
            .then((response) => response.json())
            .then((json) => json.results)
            .then((data) => dispatch(searchMovieSuccess(data, keyword)))
            .catch((error) => dispatch(searchMovieFailure(error)))
    }
}

export const fetchActorMovieList = (id: string) => {
    let url: string
    if (id) url = URL_LIST + API_KEY + '&with_cast=' + id
    else url = URL_LIST + API_KEY
    return async (dispatch: any) => {
        dispatch(fetchMovie())
        return fetch(url)
            .then((response) => response.json())
            .then((json) => json.results)
            .then((data) => dispatch(fetchMovieSuccess(data, 0, 0)))
            .catch((error) => dispatch(fetchMovieFailure(error)))
    }
}

export const fetchSimilarMovies = (movieID: string) => {
    let url = URL + API_GET_MOVIE_SIMILAR(movieID) + API_KEY
    return async (dispatch: any) => {
        dispatch(fetchMovie())
        return fetch(url)
            .then((responnse) => responnse.json())
            .then((json) => json.results)
            .then((data) => dispatch(fetchMovieSuccess(data, 0, 0)))
            .catch((error) => dispatch(fetchMovieFailure(error)))
    }
}
