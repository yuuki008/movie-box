import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  type: string
  data: Trailer[]
  error: Error
}

export const trailerlist = (state = defaultState.trailerlist, action: Params) => {
  switch (action.type) {
    case Actions.FETCH_TRAILERS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case Actions.FETCH_TRAILERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
      })
    case Actions.FETCH_TRAILERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
