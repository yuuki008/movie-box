import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { addNotification, deleteNotification } from '../../../redux/user/operations'
import { LightTooltip } from '../../'

type Props = {
  movie: Movie
  notifications: Movie[]
  notification: boolean
  notificationToggle: (notification: boolean) => void
}

export const Layout = (props: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  return !props.notification ? (
    <LightTooltip title="公開間際に通知" placement="top">
      <IconButton
        className={classes.notification}
        onClick={() => {
          props.notificationToggle(props.notification)
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
          props.notificationToggle(props.notification)
          dispatch(deleteNotification(props.movie.id))
        }}>
        <NotificationsIcon className={classes.color} />
      </IconButton>
    </LightTooltip>
  )
}

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
