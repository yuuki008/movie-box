import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  type: string
  data: Movie
  page: number
  total_pages: number
  error: Error
}

export const movieList = (state = defaultState.movielist, action: Params) => {
  switch (action.type) {
    case Actions.SEARCH_MOVIE:
    case Actions.FETCH_MOVIE:
      return { ...state, isFetching: true }
    case Actions.FETCH_MOVIE_SUCCESS:
    case Actions.SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.data,
        page: action.page,
        total_pages: action.total_pages,
      }
    case Actions.FETCH_MOVIE_FAILURE:
    case Actions.SEARCH_MOVIE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data,
      }
    default:
      return state
  }
}
