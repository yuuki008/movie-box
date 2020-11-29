import { useCallback, useEffect, useState } from 'react'

type Props = {
  movie: Movie
  notifications: Movie[]
}

export const useProps = (props: Props) => {
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

  return {
    movie: props.movie,
    notifications: props.notifications,
    notification: notification,
    notificationToggle: notificationToggle,
  }
}
