export const FETCH_MOVIE = 'FETCH_MOVIE'
export const fetchMovie = () => {
    return {
        type: FETCH_MOVIE,
    }
}

export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS'
export const fetchMovieSuccess = (data: Movie, page: number, total_pages: number) => {
    return {
        type: FETCH_MOVIE_SUCCESS,
        data,
        page,
        total_pages,
    }
}

export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE'
export const fetchMovieFailure = (error: any) => {
    return {
        type: FETCH_MOVIE_FAILURE,
    }
}

export const SEARCH_MOVIE = 'SEARCH_MOVIE'
export const searchMovie = (searchText: string) => {
    return {
        type: SEARCH_MOVIE,
        searchText,
    }
}
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS'
export const searchMovieSuccess = (data: Movie[], keyword: string) => {
    return {
        type: SEARCH_MOVIE_SUCCESS,
        data,
        keyword,
    }
}
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE'
export const searchMovieFailure = (error: any) => {
    return {
        type: SEARCH_MOVIE_FAILURE,
        error,
    }
}
