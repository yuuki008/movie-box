import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActorDetail, getMovieList } from '../../redux/selectors'
import { fetchActorDetail } from '../../redux/actor/operations'
import { fetchActorMovieList } from '../../redux/movielist/operations'

const useProps = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const actor = getActorDetail(selector)
  const movies = getMovieList(selector)
  const id = window.location.pathname.split('/actor/')[1]

  const gender = (gender: number) => {
    if (gender === 1) {
      return '女性'
    } else if (gender === 2) {
      return '男性'
    } else {
      return '不明'
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchActorDetail(id))
      dispatch(fetchActorMovieList(id))
    }
  }, [])

  return {
    actor: actor,
    movies: movies,
    gender: gender,
  }
}

export default useProps
