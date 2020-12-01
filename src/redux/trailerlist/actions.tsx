export const FETCH_TRAILERS = 'FETCH_TRAILERS'
export const fetchTrailers = () => {
  return {
    type: FETCH_TRAILERS,
  }
}
export const FETCH_TRAILERS_SUCCESS = 'FETCH_TRAILERS_SUCCESS'
export const fetchTrailersSuccess = (data: Trailer[]) => {
  return {
    type: FETCH_TRAILERS_SUCCESS,
    data,
  }
}
export const FETCH_TRAILERS_FAILURE = 'FETCH_TRAILERS_FAILURE'
export const fetchTrailersFailure = (error: Error) => {
  return {
    type: FETCH_TRAILERS_FAILURE,
    error,
  }
}
