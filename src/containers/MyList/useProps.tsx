import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks/useRedux'
import { getFavorite, getFolders, getUid } from '../../redux/selectors'
import { fetchFavoriteMovie, fetchFolders, makeFolder } from '../../redux/user/operations'

export const useProps = () => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()

  const uid = getUid(selector)
  const favorites = getFavorite(selector)
  const folders = getFolders(selector)

  const [name, setName] = useState('')
  const [background, setBackground] = useState('/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg')

  useEffect(() => {
    if (uid) {
      dispatch(fetchFavoriteMovie(uid))
      dispatch(fetchFolders(uid))
    }
  }, [uid])

  useEffect(() => {
    if (favorites.length) {
      setBackground(favorites[Math.floor(Math.random() * favorites.length)].backdrop_path)
    }
  }, [favorites])
  return {
    handleMakeFolder() {
      if (name !== '') {
        dispatch(makeFolder(uid, name))
        setName('')
        dispatch(fetchFolders(uid))
      }
    },
    inputName: useCallback(
      (value: string) => {
        setName(value)
      },
      [setName],
    ),
    background,
    folders,
    name,
    favorites,
  }
}
