import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks/useRedux'
import { push } from 'connected-react-router'
import { getIsSignedIn, getNotifications } from '../../../redux/selectors'
import { fetchNotification, signOut } from '../../../redux/user/operations'
import { signOutAction } from 'src/redux/user/actions'

export const useProps = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isSignedIn = getIsSignedIn(selector)
  const notifications = getNotifications(selector)

  const selectMenu = (path: string) => {
    dispatch(push(path))
  }

  const signoutAction = () => {
    const ret = window.confirm('サインアウトしますか?')
    if (ret) {
      dispatch(signOut())
    }
  }

  const menu = [
    { func: selectMenu, title: '新作公開', path: '/upcoming' },
    { func: selectMenu, title: '公開中', path: '/now_playing' },
    { func: selectMenu, title: '人気', path: '/' },
    { func: selectMenu, title: '高評価', path: '/top_rated' },
  ]

  const notSignInMenu = [
    { func: selectMenu, title: 'アカウント作成', path: '/signup' },
    { func: selectMenu, title: 'サインイン', path: '/signin' },
  ]

  const signInMenu = [
    { func: selectMenu, title: 'マイリスト', path: '/mylist' },
    { func: signoutAction, title: 'サインアウト', path: '/' },
  ]

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchNotification())
    }
  }, [isSignedIn])

  const list = []
  useEffect(() => {
    const today = Number(new Date())
    if (isSignedIn) {
      notifications.map((item: Movie) => {
        const release = item.release_date.split('-')
        const releaseDate = `${release[0]}/${release[1]}/${release[2]} 00:00:00`
        const data = Number(Date.parse(releaseDate))
        const milliSecond = data - today
        if (milliSecond < 604800000) {
          list.push(item)
        }
      })
    }
  }, [notifications])
  return {
    isSignedIn,
    notifications,
    anchorEl,
    handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget)
      }
    },

    handleClose() {
      setAnchorEl(null)
    },

    signOutAction,
    menu: menu,
    notSignInMenu,
    signInMenu,
  }
}
