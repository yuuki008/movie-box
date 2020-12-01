import { Card, CardActionArea, CardMedia, makeStyles, Typography, CardContent } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { URL_IMG } from '../../api'
import NoImage from '../../assets/images/no_image.png'
import LightTooltip from '../UIkit/LightTooltip'
import styled from 'styled-components'

type Props = {
  movie: Movie
}
const MovieCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <LightTooltip title={props.movie.title}>
        <CardActionArea className={classes.action}>
          <Card className={classes.root} onClick={() => dispatch(push('/movie/' + props.movie.id))}>
            <CardMedia
              className={classes.media}
              image={
                props.movie.backdrop_path !== null
                  ? URL_IMG + 'w250_and_h141_face/' + props.movie.backdrop_path
                  : NoImage
              }
            />
          </Card>
          <CardContent className={classes.content}>
            <Typography className={classes.name}>{props.movie.title}</Typography>
            <Typography className={classes.date}>{props.movie.release_date}</Typography>
          </CardContent>
        </CardActionArea>
      </LightTooltip>
    </Wrapper>
  )
}

export default MovieCard

const Wrapper = styled.div({
  width: '250px',
  padding: '15px',
})

const useStyles = makeStyles({
  root: {
    width: '250px',
    borderRadius: '10px',
  },
  media: {
    height: 141,
    width: 250,
  },
  content: {
    hight: '30px',
  },
  name: {
    height: '30px',
    fontWeight: 600,
  },
  date: {
    fontSize: '13px',
    fontWeight: 300,
    float: 'right',
  },
  action: {
    borderRadius: '10px',
  },
})
