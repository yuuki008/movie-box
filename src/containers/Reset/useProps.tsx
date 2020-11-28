import { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../redux/user/operations'

export const useProps = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const inputEmail = useCallback(
    (value: string) => {
      setEmail(value)
    },
    [setEmail],
  )
  return {
    dispatch: dispatch,
    email: email,
    inputEmail: inputEmail,
    push: push,
    resetPassword: resetPassword,
  }
}
