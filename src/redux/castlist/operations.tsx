import { API_KEY, URL_DETAIL, URL_CAST } from '../../api'
import { fetchCasts, fetchCastsSuccess, fetchCastsFailure } from './actions'

export const fetchCastList = (id: string) => {
  const url_casts = URL_DETAIL + id + URL_CAST + API_KEY
  return async (dispatch: any) => {
    dispatch(fetchCasts())
    return fetch(url_casts)
      .then((response) => response.json())
      .then((json) => json.cast)
      .then((data) => dispatch(fetchCastsSuccess(data)))
      .catch((error) => dispatch(fetchCastsFailure(error)))
  }
}
