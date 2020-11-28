export const FETCH_MOVIE_DETAIL = 'FETCH_MOVIE_DETAIL'
export const fetchMovieDetailAction = () => {
  return {
    type: FETCH_MOVIE_DETAIL,
  }
}

export const FETCH_MOVIE_DETAIL_SUCCESS = 'FETCH_MOVIE_DETAIL_SUCCESS'
export const fetchMovieDetailSuccess = (data: Movie) => {
  return {
    type: FETCH_MOVIE_DETAIL_SUCCESS,
    data,
  }
}

export const FETCH_MOVIE_DETAIL_FAILURE = 'FETCH_MOVIE_DETAIL_FAILURE'
export const fetchMovieDetailFailure = (error: any) => {
  return {
    type: FETCH_MOVIE_DETAIL_FAILURE,
    error,
  }
}
