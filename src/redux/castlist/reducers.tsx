import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  type: string
  data: Cast[]
  error: Error
}

export const castlist = (state = defaultState.castlist, action: Params) => {
  switch (action.type) {
    case Actions.FETCH_CASTS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case Actions.FETCH_CASTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
      })
    case Actions.FETCH_CASTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
