import {initialState} from '../store'
import * as Actions from './actions'

export const folder = (state = initialState.folder, action: any) => {
    switch(action.type){
        case Actions.FETCH_FOLDER_MOVIE:
            return{
                ...state,
                list: [...action.payload]
            }
        default:
            return state;
    }
}