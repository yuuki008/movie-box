import { useEffect, useState } from 'react'
import { API_KEY, URL_GENRE } from '../../../api'

type Props = {
  selectGenre: Genre[]
  toggleGenre: (genre: Genre) => void
}

export const useProps = (props: Props) => {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
    fetch(url)
      .then((response) => response.json())
      .then((json) => setGenres(json.genres))
  }, [])

  return {
    selectGenre: props.selectGenre,
    toggleGenre: props.toggleGenre,
    genres: genres
  }
}