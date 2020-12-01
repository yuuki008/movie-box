import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  payload: Movie[]
  type: string
}

export const folder = (state = defaultState.folder, action: Params) => {
  switch (action.type) {
    case Actions.FETCH_FOLDER_MOVIE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
