import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/user/operations'
import { push } from 'connected-react-router'

export const useProps = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
  return {
    inputEmail: inputEmail,
    inputPassword: inputPassword,
    email: email,
    password,
    dispatch: dispatch,
    push: push,
    signIn: signIn,
  }
}
