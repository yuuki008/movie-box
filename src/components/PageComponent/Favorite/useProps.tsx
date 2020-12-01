import { useState, useCallback, useEffect } from 'react'

type Params = {
  movie: Movie
  favorites: Movie[]
}

export const useProps = (params: Params) => {
  const [favorite, setFavorite] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (params.favorites.length > 0) {
      const list = []
      params.favorites.map((item: Movie) => {
        if (item.id === params.movie.id) {
          list.push(item)
        }
      })
      if (list.length > 0) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    }
  }, [params.favorites])

  return {
    favorite: favorite,
    open: open,
    handleClose: useCallback(() => {
      setOpen(false)
    }, [setOpen]),
    favoriteToggle: useCallback(
      (favorite: boolean) => {
        setFavorite(!favorite)
      },
      [setFavorite, favorite],
    ),
    setOpen,
    movie: params.movie,
    favorites: params.favorites,
  }
}
