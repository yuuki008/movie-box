interface movie{
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: {id: number; name: string}[];
    overview: string;
    timestamp: string;
    vote_average: number;
}

export const FETCH_MOVIE_DETAIL = "FETCH_MOVIE_DETAIL";
export const fetchMovieDetailAction = () => {
    return{
        type: FETCH_MOVIE_DETAIL,
    }
}

export const FETCH_MOVIE_DETAIL_SUCCESS = "FETCH_MOVIE_DETAIL_SUCCESS";
export const fetchMovieDetailSuccess = (data: movie) => {
    return{
        type: FETCH_MOVIE_DETAIL_SUCCESS,
        data,
    }
}

export const FETCH_MOVIE_DETAIL_FAILURE = "FETCH_MOVIE_DETAIL_FAILURE";
export const fetchMovieDetailFailure = (error: any) => {
    return{
        type: FETCH_MOVIE_DETAIL_FAILURE,
        error,
    }
}