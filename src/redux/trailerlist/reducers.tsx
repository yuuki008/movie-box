import { initialState } from '../store'
import * as Actions from './actions'

export const trailerlist = (state = initialState.list, action: any) => {
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
        error: action.data,
      })
    default:
      return state
  }
}
