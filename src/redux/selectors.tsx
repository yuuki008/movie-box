import { create } from 'domain';
import {createSelector} from 'reselect';


const movielist = (state: any) => state.movielist
const moviedetail = (state: any) => state.moviedetail
const castlist = (state: any) => state.castlist
const trailerlist = (state: any) => state.trailerlist
const actordetail = (state: any) => state.actordetail
const user = (state:any) => state.user
const folder = (state:any) => state.folder


export const getMovieList = createSelector(
    [movielist],
    state => state
)

export const getMovieDetail = createSelector(
    [moviedetail],
    state => state
)

export const getCastList = createSelector(
    [castlist],
    state => state
)

export const getTrailerList = createSelector(
    [trailerlist],
    state => state
)

export const getActorDetail = createSelector(
    [actordetail],
    state => state
)

export const getIsSignedIn = createSelector(
    [user],
    state => state.isSignedIn
)

export const getGenres = createSelector(
    [user],
    state => state.genres
)

export const getFavorite = createSelector(
    [user],
    state => state.favorite
)

export const getUid = createSelector(
    [user],
    state => state.uid
)

export const getFolders = createSelector(
    [user],
    state => state.folder
)

export const getFolderMovies = createSelector(
    [folder],
    state => state.list
)

export const getNotifications = createSelector(
    [user],
    state => state.notifications
)