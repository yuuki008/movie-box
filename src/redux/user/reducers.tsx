import { defaultState } from '../store'
import * as Actions from './actions'

type Params = {
  type: string
  moviePayload: Movie[]
  folderPayload: Folder[]
  data: User
}

export const userReducer = (state = defaultState.user, action: Params) => {
  switch (action.type) {
    case Actions.FETCH_NOTIFICATION:
      return {
        ...state,
        notifications: [...action.moviePayload],
      }
    case Actions.FETCH_FOLDER:
      return {
        ...state,
        folder: [...action.folderPayload],
      }
    case Actions.FETCH_FAVORITE:
      return {
        ...state,
        favorite: [...action.moviePayload],
      }
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.data,
      }
    case Actions.SIGN_OUT:
      return {
        ...action.data,
      }
    default:
      return state
  }
}
