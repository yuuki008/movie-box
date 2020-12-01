import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  data: MovieDetail
  type: String
  error: Error
}

export const movieDetail = (state = defaultState.moviedetail, action: Params) => {
  switch (action.type) {
    case Actions.FETCH_MOVIE_DETAIL:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case Actions.FETCH_MOVIE_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.data,
      })
    case Actions.FETCH_MOVIE_DETAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
