import { initialState } from '../store'
import * as Actions from './actions'

export const actorDetail = (state = initialState.item, action: any) => {
  switch (action.type) {
    case Actions.FETCH_ACTOR:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case Actions.FETCH_ACTOR_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.data,
      })
    case Actions.FETCH_ACTOR_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
