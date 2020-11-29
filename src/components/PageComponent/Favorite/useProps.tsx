import { useState, useCallback, useEffect } from 'react'

type Props = {
  movie: Movie
  favorites: Movie[]
}

export const useProps = (props: Props) => {
  const [favorite, setFavorite] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const favoriteToggle = useCallback(
    (favorite: boolean) => {
      setFavorite(!favorite)
    },
    [setFavorite, favorite],
  )

  useEffect(() => {
    if (props.favorites.length > 0) {
      const list = []
      props.favorites.map((item: Movie) => {
        if (item.id === props.movie.id) {
          list.push(item)
        }
      })
      if (list.length > 0) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    }
  }, [props.favorites])

  return {
    favorite: favorite,
    open: open,
    handleClose: handleClose,
    favoriteToggle: favoriteToggle,
    movie: props.movie,
    favorites: props.favorites,
    setOpen: setOpen,
  }
}
