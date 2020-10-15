interface actor{
  biography: string;
  birthday: string;
  gender: number;
  name: string;
  profile_path: string;
  place_of_birth: string;
  id: number;
  popularity: number;
  known_for_department: string;
}

export const FETCH_CASTS = 'FETCH_CASTS';
export const fetchCasts = () => {
  return {
    type: FETCH_CASTS
  };
}
export const FETCH_CASTS_SUCCESS = 'FETCH_CASTS_SUCCESS';
export const fetchCastsSuccess = (data:any) => {
  return {
    type: FETCH_CASTS_SUCCESS,
    data
  };
}
export const FETCH_CASTS_FAILURE = 'FETCH_CASTS_FAILURE';
export const fetchCastsFailure= (error:any) => {
  return {
    type: FETCH_CASTS_FAILURE,
    error
  };
}