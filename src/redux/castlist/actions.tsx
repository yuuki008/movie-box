export const FETCH_CASTS = 'FETCH_CASTS'
export const fetchCasts = () => {
    return {
        type: FETCH_CASTS,
    }
}
export const FETCH_CASTS_SUCCESS = 'FETCH_CASTS_SUCCESS'
export const fetchCastsSuccess = (data: Cast[]) => {
    return {
        type: FETCH_CASTS_SUCCESS,
        data,
    }
}
export const FETCH_CASTS_FAILURE = 'FETCH_CASTS_FAILURE'
export const fetchCastsFailure = (error: any) => {
    return {
        type: FETCH_CASTS_FAILURE,
        error,
    }
}
