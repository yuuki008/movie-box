import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from './redux/selectors'
import { listenAuthState } from './redux/user/operations'
import { push } from 'connected-react-router'

type Props = {
  children: any
}
const AuthWrapper = (props: Props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)
  const path = window.location.pathname

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if (!isSignedIn) {
    if (path === '/mylist') {
      dispatch(push('/'))
      return props.children
    }
    return props.children
  } else {
    if (path === '/signin') {
      dispatch(push('/'))
    }
    return props.children
  }
}

export default AuthWrapper
