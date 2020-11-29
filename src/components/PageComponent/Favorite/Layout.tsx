import React from 'react'
import { addFavoriteMovie, deleteFavoriteMovie } from '../../../redux/user/operations'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { Notification, LightTooltip } from '../../'
import styled from 'styled-components'

type Props = {
  favorite: boolean
  open: boolean
  handleClose: () => void
  favoriteToggle: (favorite: boolean) => void
  movie: Movie
  favorites: Movie[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const Layout = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Wrapper className="movie__favorite">
      {props.favorite ? (
        <LightTooltip placement="top" title="お気に入りから削除">
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              props.favoriteToggle(props.favorite)
              dispatch(deleteFavoriteMovie(props.movie.id))
            }}>
            <FavoriteIcon className={classes.color} />
          </IconButton>
        </LightTooltip>
      ) : (
        <LightTooltip title="お気に入りに追加" placement="top">
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              props.favoriteToggle(props.favorite)
              props.setOpen(true)
              dispatch(addFavoriteMovie(props.movie))
            }}>
            <FavoriteIcon className={classes.icon} />
          </IconButton>
        </LightTooltip>
      )}
      <Notification open={props.open} handleClose={props.handleClose} label="お気に入りへ追加しました。" />
    </Wrapper>
  )
}

const useStyles = makeStyles({
  iconButton: {
    height: 30,
    lineHeight: 30,
    width: 30,
    marginTop: '5px',
    backgroundColor: 'rgb(3,37,65)',
    marginRight: '10px',
  },
  color: {
    color: 'red',
    width: '15px',
    height: '15px',
  },
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
  },
  icon: {
    width: '15px',
    height: '15px',
    color: 'lightgray',
  },
})

const Wrapper = styled.div``
