export const FETCH_FOLDER_MOVIE = 'FETCH_FOLDER_MOVIE'
export const fethcFolderMovieAction = (list: Movie[]) => {
  return {
    type: FETCH_FOLDER_MOVIE,
    payload: list,
  }
}
