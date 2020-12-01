import { useCallback, useEffect, useState } from 'react'

type Params = {
  movie: Movie
  notifications: Movie[]
}

export const useProps = (params: Params) => {
  const [notification, setNotification] = useState(false)

  const notificationToggle = useCallback(
    (notification) => {
      setNotification(!notification)
    },
    [setNotification],
  )

  useEffect(() => {
    if (params.notifications.length > 0) {
      const list = []
      params.notifications.map((item: Movie) => {
        if (item.id === params.movie.id) {
          list.push(item)
        }
      })
      if (list.length > 0) {
        setNotification(true)
      } else {
        setNotification(false)
      }
    }
  }, [params.notifications])

  return {
    movie: params.movie,
    notifications: params.notifications,
    notification: notification,
    notificationToggle: notificationToggle,
  }
}
