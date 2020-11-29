import React from 'react'
import styled from 'styled-components'

type Props = {
  selectGenre: Genre[]
  toggleGenre: (genre: Genre) => void
  genres: Genre[]
}

export const Layout = (props: Props) => {
  return (
    <Wrapper>
      <SpaceMedium className="module-spacer--medium" />
      <GenreSelected>{props.selectGenre.map((g: Genre) => g.name).join(' | ')}</GenreSelected>
      <Genres>
        {props.genres.map((genre: Genre) => (
          <Button key={genre.id + genre.name} onClick={() => props.toggleGenre(genre)}>
            {genre.name}
          </Button>
        ))}
      </Genres>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  margin: '0 auto 10px auto',
  textAlign: 'center',
})

const SpaceMedium = styled.div``

const GenreSelected = styled.div({
  fontWeight: 600,
  fontSize: '18px',
  padding: '12px',
  border: '1px solid #fff',
  borderRadius: '0.25em',
  marginBottom: '1em',
})

const Genres = styled.div({
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
