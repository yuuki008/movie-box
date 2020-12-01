import { useState, useCallback, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { API_KEY, URL_GENRE } from '../../api'
import { signUp } from '../../redux/user/operations'

export const useProps = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [myGenres, setMyGenres] = useState<Genre[]>([])

  const selectGenre = (genre: Genre, setCheck: React.Dispatch<React.SetStateAction<boolean>>) => {
    const filteredGenres = myGenres.filter((g) => g.id !== genre.id)
    if (filteredGenres.length === myGenres.length) {
      setMyGenres([...filteredGenres, genre])
      setCheck(true)
    } else {
      setMyGenres([...filteredGenres])
      setCheck(false)
    }
  }

  const inputUsername = useCallback(
    (value: string) => {
      setUsername(value)
    },
    [setUsername],
  )

  const inputEmail = useCallback(
    (value: string) => {
      setEmail(value)
    },
    [setEmail],
  )

  const inputPassword = useCallback(
    (value: string) => {
      setPassword(value)
    },
    [setPassword],
  )

  const inputConfirmPassword = useCallback(
    (value: string) => {
      setConfirmPassword(value)
    },
    [setConfirmPassword],
  )

  useEffect(() => {
    const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
    fetch(url)
      .then((response) => response.json())
      .then((json) => setGenres(json.genres))
  }, [])

  return {
    inputUsername,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    selectGenre,
    username,
    email,
    password,
    confirmPassword,
    genres,
    myGenres,
    dispatch,
    signUp,
    push,
  }
}
