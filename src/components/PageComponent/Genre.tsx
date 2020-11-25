import React, { useEffect, useState } from 'react'
import { API_KEY, URL_GENRE } from '../../api'
import styled from 'styled-components'

interface genre {
    id: number
    name: string
}

interface Props {
    selectGenre: genre[]
    toggleGenre: (genre: genre) => void
}

const Genre: React.FC<Props> = ({ selectGenre, toggleGenre }) => {
    const [genres, setGenres] = useState<genre[]>([])

    useEffect(() => {
        const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
        fetch(url)
            .then((response) => response.json())
            .then((json) => setGenres(json.genres))
    }, [])
    return (
        <Div>
            <div className="module-spacer--medium" />
            <DivSelected>{selectGenre.map((g: genre) => g.name).join(' | ')}</DivSelected>
            <DivGenres>
                {genres.map((genre: genre) => (
                    <Button key={genre.id + genre.name} onClick={() => toggleGenre(genre)}>
                        {genre.name}
                    </Button>
                ))}
            </DivGenres>
        </Div>
    )
}

export default Genre

const Div = styled.div({
    margin: '0 auto 10px auto',
    textAlign: 'center',
})

const DivSelected = styled.div({
    fontWeight: 600,
    fontSize: '18px',
    padding: '12px',
    border: '1px solid #fff',
    borderRadius: '0.25em',
    marginBottom: '1em',
})

const DivGenres = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0.4em',
    justifyContent: 'center',
})

const Button = styled.div({
    fontFamily: 'Oswald, sans-serif',
    fontSize: '15px',
    letterSpacing: '3px',
    color: 'white',
    padding: '8px 12px',
    border: '2px solid rgb(3,37,65)',
    borderRadius: '1em 0.25em',
    backgroundColor: 'rgb(3,37,65) !important',
    marginTop: '0.6em',
    marginRight: '0.6em',
    outline: 'none',
    '&:hover': {
        transform: 'scale(1.1)',
    },
})
