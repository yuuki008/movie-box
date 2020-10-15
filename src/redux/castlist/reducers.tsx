import { initialState } from "../store";
import * as Actions from './actions'

export const castlist = (state = initialState.list, action: any) => {
    switch(action.type){
        case Actions.FETCH_CASTS:
            return Object.assign({}, state,{
                isFetching: true,
            });
        case Actions.FETCH_CASTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.data
            });
        case Actions.FETCH_CASTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.data
            });
        default: 
            return state;
    }
}