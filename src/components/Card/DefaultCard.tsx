import React, { useEffect, useState } from 'react'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useDispatch } from 'react-redux'
import { URL_IMG } from '../../api'
import NoImage from '../../assets/images/no_image.png'
import styled from 'styled-components'
import { CardActionArea } from '@material-ui/core'
import RatingStar from '../UIkit/RatingStar'

type Props = {
  info: boolean
  path: string
  id: number
  title: string
  voteAverage: number
  release_date: string
  voteCount: number
  name: string
  first_air_date: string
}

const DefaultCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [released, setReleased] = useState(true)

  useEffect(() => {
    if (!!props.release_date) {
      const release = props.release_date.split('-')
      const year = release[0]
      const month = release[1]
      const date = release[2]
      const releaseDate = `${year}/${month}/${date} 00:00:00`
      const today = Number(new Date())
      const data = Number(Date.parse(releaseDate))
      if (data < today) {
        setReleased(true)
      } else {
        setReleased(false)
      }
    }
  }, [])

  return (
    <Wrapper>
      <Card className={classes.root} onClick={() => dispatch(push('/movie/' + props.id))}>
        <CardActionArea>
          <MovieImage
            src={props.path === null ? NoImage : URL_IMG + 'w600_and_h900_bestv2' + props.path}
            alt={props.title}
          />
          <CardContent className={classes.content}>
            {props.info && (
              <>
                <MovieTitle>{props.title === undefined ? props.name : props.title}</MovieTitle>
                {props.voteCount === 0 ? (
                  <></>
                ) : (
                  <RatingStar voteAverage={props.voteAverage} voteCount={props.voteCount} />
                )}
                <ReleaseText>
                  {!released && <span>未公開</span>} {props.release_date || props.first_air_date}
                </ReleaseText>
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Wrapper>
  )
}

export default DefaultCard

const MovieImage = styled.img({
  width: 250,
  height: 375,
})

const MovieTitle = styled.div({
  height: '40px',
  overflowY: 'scroll',
  fontSize: '15px',
  fontWeight: 550,
})

const Wrapper = styled.div({
  width: '300px',
  marginLeft: '45px',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    transform: 'scale(1.06) translate(0, 20px)',
  },
})

const ReleaseText = styled.div({
  fontSize: '14px',
  position: 'absolute',
  fontWeight: 400,
  right: 8,
  bottom: 55,
  span: {
    fontSize: '15px',
    fontWeight: 600,
    paddingRight: '20px',
  },
})

const useStyles = makeStyles({
  root: {
    width: '250px',
    borderRadius: '20px',
  },
  content: {
    height: '110px',
    width: '220px',
    fontSize: '20px',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    position: 'relative',
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    backgroundSize: 'cover',
    paddingTop: '120%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
})
