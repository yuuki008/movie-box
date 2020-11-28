import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCastList } from '../../redux/castlist/operations'
import { fetchMovieDetail } from '../../redux/movie/operations'
import { fetchTrailerList } from '../../redux/trailerlist/operations'
import {
  getCastList,
  getFavorite,
  getIsSignedIn,
  getMovieDetail,
  getMovieList,
  getNotifications,
  getTrailerList,
  getUid,
} from '../../redux/selectors'
import { fetchSimilarMovies } from '../../redux/movielist/operations'
import { fetchFavoriteMovie, fetchNotification } from '../../redux/user/operations'

export const useProps = () => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()

  const movie = getMovieDetail(selector)
  const casts = getCastList(selector)
  const trailers = getTrailerList(selector)
  const movies = getMovieList(selector)
  const isSignedIn = getIsSignedIn(selector)
  const favorites = getFavorite(selector)
  const uid = getUid(selector)
  const notifications = getNotifications(selector)

  const id = window.location.pathname.split('/movie/')[1]

  const [released, setReleased] = useState(false)

  const backdropImage = `url(https://image.tmdb.org/t/p/original${movie.item.backdrop_path})`
  let year
  if (typeof movie.item.release_date === 'string') {
    year = movie.item.release_date.split('-')[0]
  }

  const stringmethod = (str: string) => {
    if (str !== undefined) {
      const date = str.substr(0, 4) + '年' + str.substr(5, 2) + '月' + str.substr(8, 2) + '日'
      return date
    }
  }

  const usePrevious = (value: string) => {
    const ref = useRef<string>()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevId = usePrevious(id)

  useEffect(() => {
    if (id && prevId !== id) {
      dispatch(fetchMovieDetail(id))
      dispatch(fetchCastList(id))
      dispatch(fetchTrailerList(id))
    }
  }, [id])

  useEffect(() => {
    if (uid !== '' && isSignedIn) {
      dispatch(fetchFavoriteMovie(uid))
      dispatch(fetchNotification())
    }
  }, [uid])

  console.log(movie)

  useEffect(() => {
    if (movie.item.release_date !== undefined) {
      const release = movie.item.release_date.split('-')
      const year = release[0]
      const month = release[1]
      const date = release[2]
      const releaseDate = `${year}/${month}/${date} 00:00:00`
      const today: any = new Date()
      const data: any = Date.parse(releaseDate)
      if (data < today) {
        setReleased(true)
      } else {
        setReleased(false)
      }
    }
    if (movie.item !== {}) {
      dispatch(fetchSimilarMovies(movie.item.id))
    }
  }, [movie])
  return {
    movie: movie,
    casts: casts,
    trailers: trailers,
    backdropImage: backdropImage,
    isSignedIn: isSignedIn,
    year: year,
    released: released,
    stringmethod: stringmethod,
    notifications: notifications,
    movies: movies,
    favorites: favorites,
  }
}
