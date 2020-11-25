import { initialState } from '../store'
import * as Actions from './actions'

export const movieList = (state = initialState.list, action: any) => {
    switch (action.type) {
        case Actions.SEARCH_MOVIE:
        case Actions.FETCH_MOVIE:
            return { ...state, isFetching: true }
        case Actions.FETCH_MOVIE_SUCCESS:
        case Actions.SEARCH_MOVIE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.data,
                page: action.page,
                total_pages: action.total_pages,
            }
        case Actions.FETCH_MOVIE_FAILURE:
        case Actions.SEARCH_MOVIE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.data,
            }
        default:
            return state
    }
}
