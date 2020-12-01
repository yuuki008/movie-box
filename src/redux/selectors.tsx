import { createSelector } from 'reselect'

const movielist = (state: StoreState) => {
  console.log(state)
  return state.movielist
}
const moviedetail = (state: StoreState) => state.moviedetail
const castlist = (state: StoreState) => state.castlist
const trailerlist = (state: StoreState) => state.trailerlist
const actordetail = (state: StoreState) => state.actordetail
const user = (state: StoreState) => state.user
const folder = (state: StoreState) => state.folder

export const getMovieList = createSelector([movielist], (state) => state)

export const getMovieDetail = createSelector([moviedetail], (state) => state)

export const getCastList = createSelector([castlist], (state) => state)

export const getTrailerList = createSelector([trailerlist], (state) => state)

export const getActorDetail = createSelector([actordetail], (state) => state)

export const getIsSignedIn = createSelector([user], (state) => state.isSignedIn)

export const getGenres = createSelector([user], (state) => state.genres)

export const getFavorite = createSelector([user], (state) => state.favorite)

export const getUid = createSelector([user], (state) => state.uid)

export const getFolders = createSelector([user], (state) => state.folder)

export const getFolderMovies = createSelector([folder], (state) => state)

export const getNotifications = createSelector([user], (state) => state.notifications)
