import { API_KEY, URL_DETAIL } from '../../api'
import { fetchMovieDetailSuccess, fetchMovieDetailAction, fetchMovieDetailFailure } from './actions'

export const fetchMovieDetail = (id: string) => {
    const url_movie = URL_DETAIL + id + API_KEY
    return async (dispatch: any) => {
        dispatch(fetchMovieDetailAction())
        return fetch(url_movie)
            .then((response) => response.json())
            .then((data) => dispatch(fetchMovieDetailSuccess(data)))
            .catch((error) => dispatch(fetchMovieDetailFailure(error)))
    }
}
