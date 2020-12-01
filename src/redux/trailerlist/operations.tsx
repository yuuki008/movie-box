import { API_KEY, URL_DETAIL, URL_VIDEO } from '../../api'
import { fetchTrailers, fetchTrailersFailure, fetchTrailersSuccess } from './actions'

export const fetchTrailerList = (id: string) => {
  const url_trailers = URL_DETAIL + id + URL_VIDEO + API_KEY
  return async (dispatch: React.Dispatch<unknown>) => {
    dispatch(fetchTrailers())
    return fetch(url_trailers)
      .then((response) => response.json())
      .then((json) => json.results)
      .then((data) => {
        const youtubeTrailers = data.filter((trailer: { site: string }) => {
          return trailer.site === 'YouTube'
        })
        dispatch(fetchTrailersSuccess(youtubeTrailers))
      })
      .catch((error) => dispatch(fetchTrailersFailure(error)))
  }
}
