import React, { useCallback, useEffect, useState } from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { addNotification, deleteNotification } from '../../redux/user/operations'
import { LightTooltip } from '../'
import { useDispatch } from 'react-redux'

type Props = {
  movie: Movie
  notifications: Movie[]
}
const Release: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [notification, setNotification] = useState(false)

  const notificationToggle = useCallback(
    (notification) => {
      setNotification(!notification)
    },
    [setNotification],
  )

  useEffect(() => {
    if (props.notifications.length > 0) {
      const list = []
      props.notifications.map((item: Movie) => {
        if (item.id === props.movie.id) {
          list.push(item)
        }
      })
      if (list.length > 0) {
        setNotification(true)
      } else {
        setNotification(false)
      }
    }
  }, [props.notifications])
  return !notification ? (
    <LightTooltip title="公開間際に通知" placement="top">
      <IconButton
        className={classes.notification}
        onClick={() => {
          notificationToggle(notification)
          dispatch(addNotification(props.movie))
        }}>
        <NotificationsIcon className={classes.icon} />
      </IconButton>
    </LightTooltip>
  ) : (
    <LightTooltip title="通知を無しにする" placement="top">
      <IconButton
        className={classes.notification}
        onClick={() => {
          notificationToggle(notification)
          dispatch(deleteNotification(props.movie.id))
        }}>
        <NotificationsIcon className={classes.color} />
      </IconButton>
    </LightTooltip>
  )
}

export default Release

const useStyles = makeStyles({
  notification: {
    height: 30,
    lineHeight: 30,
    width: 30,
    marginLeft: '10px',
    backgroundColor: 'rgb(3, 37, 65)',
    marginTop: '5px',
  },
  icon: {
    color: 'lightgray',
    width: '20px',
    height: '20px',
  },
  color: {
    widht: '20px',
    height: '20px',
    color: 'yellow',
  },
})
