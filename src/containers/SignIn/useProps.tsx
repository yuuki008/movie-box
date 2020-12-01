import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/user/operations'
import { push } from 'connected-react-router'

export const useProps = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return {
    inputEmail: useCallback(
      (value: string) => {
        setEmail(value)
      },
      [setEmail],
    ),
    inputPassword: useCallback(
      (value: string) => {
        setPassword(value)
      },
      [setPassword],
    ),
    email,
    password,
    dispatch,
    push,
    signIn,
  }
}
