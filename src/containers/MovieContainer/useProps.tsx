import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks/useRedux'
import { getMovieList } from '../../redux/selectors'
import { searchMovieList, fetchMovieList } from '../../redux/movielist/operations'
import {
  API_GET_MOVIE_NOW_PLAYING,
  API_GET_MOVIE_POPULAR,
  API_GET_MOVIE_TOP_RATED,
  API_GET_MOVIE_UPCOMING,
} from '../../api'

export const useProps = () => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()
  const movielist = getMovieList(selector)
  const movies = movielist.items
  const isFetching = movielist.isFetching
  const total_pages = movielist.total_pages
  const page = movielist.page
  const [selectGenre, setSelectGenre] = useState<Genre[]>([])
  const path = window.location.pathname
  const keyword = path.split('/search/')[1]

  const pageTitle = (path: string) => {
    switch (path) {
      case (path = '/upcoming'):
        return '新作'
      case (path = '/'):
        return '人気'
      case (path = '/top_rated'):
        return '高評価'
      case (path = '/now_playing'):
        return '公開中'
      default:
        return null
    }
  }
  const toggleGenre = (genre: Genre) => {
    const filteredGenres = selectGenre.filter((g: Genre) => g.id !== genre.id)
    if (filteredGenres.length === selectGenre.length) {
      setSelectGenre([...filteredGenres, genre])
    } else {
      setSelectGenre([...filteredGenres])
    }
  }

  const changePage = (page: number) => {
    if (page === 0) {
      alert('該当の作品はありませんでした。')
      return false
    }
    const newPage = page.toString()
    if (newPage === 'NaN') {
      return false
    } else {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('currentPage', JSON.stringify(page))
      }
      const GenresID = selectGenre.map((g: Genre) => g.id)
      if (path === '/') {
        dispatch(fetchMovieList(API_GET_MOVIE_POPULAR, GenresID, page))
      } else if (path === '/upcoming') {
        dispatch(fetchMovieList(API_GET_MOVIE_UPCOMING, GenresID, page))
      } else if (path === '/now_playing') {
        dispatch(fetchMovieList(API_GET_MOVIE_NOW_PLAYING, GenresID, page))
      } else if (path === '/top_rated') {
        dispatch(fetchMovieList(API_GET_MOVIE_TOP_RATED, GenresID, page))
      }
    }
  }

  useEffect(() => {
    if (keyword) {
      dispatch(searchMovieList(keyword))
    }
  }, [keyword])

  useEffect(() => {
    const genreIDs = selectGenre.map((g: Genre): number => {
      return g.id
    })
    if (path === '/') {
      dispatch(fetchMovieList(API_GET_MOVIE_POPULAR, genreIDs))
    } else if (path === '/upcoming') {
      dispatch(fetchMovieList(API_GET_MOVIE_UPCOMING, genreIDs))
    } else if (path === '/now_playing') {
      dispatch(fetchMovieList(API_GET_MOVIE_NOW_PLAYING, genreIDs))
    } else if (path === '/top_rated') {
      dispatch(fetchMovieList(API_GET_MOVIE_TOP_RATED, genreIDs))
    }
  }, [selectGenre, path])

  return {
    movies,
    selectGenre,
    toggleGenre,
    keyword,
    pageTitle,
    changePage,
    page,
    total_pages,
    path,
    isFetching,
  }
}
