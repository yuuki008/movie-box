interface movie {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    genres: { id: number; name: string }[]
    overview: string
    timestamp: string
    vote_average: number
}

export const FETCH_FOLDER_MOVIE = 'FETCH_FOLDER_MOVIE'
export const fethcFolderMovieAction = (list: movie[]) => {
    return {
        type: FETCH_FOLDER_MOVIE,
        payload: list,
    }
}
