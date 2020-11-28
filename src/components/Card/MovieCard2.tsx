import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { URL_IMG } from '../../api'
import NoImage from '../../assets/images/no_image.png'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { LightTooltip } from '../UIkit'
import styled from 'styled-components'

type Props = {
  movie: {
    id: number
    poster_path: string
    title: string
    release_date: string
  }
}

const MovieCard2: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const release = () => {
    if (props.movie.release_date === '') {
      return '未公開'
    } else {
      return `${props.movie.release_date}リリース`
    }
  }
  return (
    <Wrapper>
      <LightTooltip title={release()}>
        <CardActionArea onClick={() => dispatch(push('/movie/' + props.movie.id))}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={
                props.movie.poster_path !== null ? URL_IMG + 'w150_and_h225_bestv2' + props.movie.poster_path : NoImage
              }
            />
          </Card>
          <CardContent className={classes.content}>
            <Typography className={classes.title}>{props.movie.title}</Typography>
          </CardContent>
        </CardActionArea>
      </LightTooltip>
    </Wrapper>
  )
}

export default MovieCard2

const Wrapper = styled.div({
  width: '130px',
  margin: '10px',
})

const useStyles = makeStyles({
  root: {
    width: 130,
  },
  media: {
    width: '130px',
    height: '195px',
    borderRadius: '10px',
  },
  content: {
    height: '30px',
    overflowY: 'scroll',
    padding: '10px',
  },
  title: {
    fontSize: '13px',
    fontWeight: 600,
  },
})
