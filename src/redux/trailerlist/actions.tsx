interface trailer{
  key: string;
}
export const FETCH_TRAILERS = 'FETCH_TRAILERS';
export const fetchTrailers = () => {
  return {
    type: FETCH_TRAILERS
  };
}
export const FETCH_TRAILERS_SUCCESS = 'FETCH_TRAILERS_SUCCESS';
export const fetchTrailersSuccess = (data: trailer[]) => {
  return {
    type: FETCH_TRAILERS_SUCCESS,
    data
  };
}
export const FETCH_TRAILERS_FAILURE = 'FETCH_TRAILERS_FAILURE';
export const fetchTrailersFailure = (error:any) => {
  return {
    type: FETCH_TRAILERS_FAILURE,
    error
  };
}