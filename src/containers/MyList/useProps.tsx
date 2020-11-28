import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorite, getFolders, getUid } from '../../redux/selectors'
import { fetchFavoriteMovie, fetchFolders, makeFolder } from '../../redux/user/operations'

export const useProps = () => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [background, setBackground] = useState('/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg')

  const uid = getUid(selector)
  const favorites = getFavorite(selector)
  const folders = getFolders(selector)

  const inputName = useCallback(
    (value: string) => {
      setName(value)
    },
    [setName],
  )

  const handleMakeFolder = () => {
    if (name !== '') {
      dispatch(makeFolder(uid, name))
      setName('')
      dispatch(fetchFolders(uid))
    }
  }

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
    handleMakeFolder: handleMakeFolder,
    inputName: inputName,
    background: background,
    folders: folders,
    name: name,
    favorites: favorites,
  }
}
