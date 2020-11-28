import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux'
import { URL_IMG } from '../../api'
import { push } from 'connected-react-router'
import NoImage from '../../assets/images/no_image.png'
import { LightTooltip } from '../UIkit'
import styled from 'styled-components'

type Props = {
  cast: {
    name: string
    content: string
    id: number
    profile_path: string
    character: string
  }
}

const Cast: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Card className={classes.root}>
        <LightTooltip title={props.cast.name}>
          <CardActionArea onClick={() => dispatch(push('/actor/' + props.cast.id))}>
            <CardMedia
              className={classes.media}
              image={
                props.cast.profile_path !== null
                  ? URL_IMG + 'w138_and_h175_face/' + props.cast.profile_path.slice(1)
                  : NoImage
              }
              title={props.cast.character}
            />
            <CardContent className={classes.content}>
              <Typography className={classes.name}>{props.cast.name}</Typography>
              <Typography className={classes.character}>{props.cast.character}</Typography>
            </CardContent>
          </CardActionArea>
        </LightTooltip>
      </Card>
    </Wrapper>
  )
}

export default Cast

const useStyles = makeStyles({
  root: {
    width: '138px',
    borderRadius: '10px',
  },
  media: {
    height: 175,
    width: 135,
    backgroundSize: 'contain',
    backgroundColor: 'lightgray',
    borderRadius: '10px',
  },
  name: {
    fontSize: '14px',
  },
  character: {
    fontSize: '10px',
    fontWeight: 300,
  },
  content: {
    overflowY: 'scroll',
    height: '40px',
  },
})

const Wrapper = styled.div({
  width: '138px',
  margin: '10px',
})
