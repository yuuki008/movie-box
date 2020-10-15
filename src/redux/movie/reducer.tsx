import { initialState } from "../store";
import * as Actions from './actions'

export const movieDetail = (state = initialState.item, action: any) => {
    switch(action.type){
        case Actions.FETCH_MOVIE_DETAIL:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Actions.FETCH_MOVIE_DETAIL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.data
            })
        case Actions.FETCH_MOVIE_DETAIL_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.data
            })
        default: 
            return state
    }
}
