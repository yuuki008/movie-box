import React from 'react'
import { LightTooltip } from '../../'
import MovieCard from '../../Card/MovieCard'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import styled from 'styled-components'

type Props = {
  movies: Movie[]
  folder: Folder
  handleDelete: () => void
}
export const Layout = (props: Props) => {
  const classes = useStyles()
  return (
    <>
      {props.movies.length === 0 ? (
        <NonWrapper>
          <LightTooltip title="作品がまだありません" placement="left">
            <SectionTitle style={{ height: '40px', lineHeight: '40px' }}>{props.folder.name}</SectionTitle>
          </LightTooltip>
          <IconButton onClick={() => props.handleDelete()}>
            <LightTooltip title={`${props.folder.name}を削除`}>
              <DeleteIcon />
            </LightTooltip>
          </IconButton>
        </NonWrapper>
      ) : (
        <Wrapper>
          <TitleWrapper>
            <SectionTitle>{props.folder.name}</SectionTitle>
            <TitleWrapper2>
              <IconButton className={classes.icon} onClick={() => props.handleDelete()}>
                <LightTooltip title={`${props.folder.name}を削除`}>
                  <DeleteIcon />
                </LightTooltip>
              </IconButton>
            </TitleWrapper2>
          </TitleWrapper>
          <MovieWrapper>
            {props.movies.map((movie: any) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </MovieWrapper>
        </Wrapper>
      )}
    </>
  )
}

const SectionTitle = styled.div({
  fontWeight: 600,
  fontSize: '18px',
  padding: '10px',
})

const NonWrapper = styled.div({
  height: '40px',
  position: 'relative',
  display: 'flex',
})

const Wrapper = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const TitleWrapper = styled.div({
  width: '100%',
  display: 'flex',
  position: 'relative',
})

const TitleWrapper2 = styled.div({
  height: '60px',
  position: 'relative',
})
const MovieWrapper = styled.div({
  display: 'flex',
  overflowY: 'scroll',
  width: '100%',
})

const useStyles = makeStyles({
  icon: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    bottom: 12,
  },
})
