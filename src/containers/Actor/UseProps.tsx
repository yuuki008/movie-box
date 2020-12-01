import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks/useRedux'
import { getActorDetail, getMovieList } from '../../redux/selectors'
import { fetchActorDetail } from '../../redux/actor/operations'
import { fetchActorMovieList } from '../../redux/movielist/operations'

export const useProps = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const actor = getActorDetail(selector)
  const movies = getMovieList(selector)
  const id = window.location.pathname.split('/actor/')[1]

  useEffect(() => {
    if (id) {
      dispatch(fetchActorDetail(id))
      dispatch(fetchActorMovieList(id))
    }
  }, [])

  return {
    actor,
    movies,
    gender(gender: number) {
      if (gender === 1) {
        return '女性'
      } else if (gender === 2) {
        return '男性'
      } else {
        return '不明'
      }
    },
  }
}
