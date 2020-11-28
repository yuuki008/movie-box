import { initialState } from '../store'
import * as Actions from './actions'

export const userReducer = (state = initialState.user, action: any) => {
  switch (action.type) {
    case Actions.FETCH_NOTIFICATION:
      return {
        ...state,
        notifications: [...action.payload],
      }
    case Actions.FETCH_FOLDER:
      return {
        ...state,
        folder: [...action.payload],
      }
    case Actions.FETCH_FAVORITE:
      return {
        ...state,
        favorite: [...action.payload],
      }
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
