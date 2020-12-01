import { useEffect, useState } from 'react'
import { API_KEY, URL_GENRE } from '../../../api'

type Params = {
  selectGenre: Genre[]
  toggleGenre: (genre: Genre) => void
}

export const useProps = (params: Params) => {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
    fetch(url)
      .then((response) => response.json())
      .then((json) => setGenres(json.genres))
  }, [])

  return {
    selectGenre: params.selectGenre,
    toggleGenre: params.toggleGenre,
    genres: genres,
  }
}
