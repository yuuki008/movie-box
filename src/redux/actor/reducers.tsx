import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  type: string
  data: Actor
  error: Error
}

export const actorDetail = (state = defaultState.actordetail, action: Params) => {
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
