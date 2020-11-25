import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { IMG_SIZE_XSMALL, URL_IMG } from '../../api'
import logo from '../../assets/images/logo_square.svg'
import { push } from 'connected-react-router'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { db } from '../../firebase/index'
import { getUid } from '../../redux/selectors'

const useStyles = makeStyles({
    notification: {
        display: 'flex',
    },
})

const Div = styled.div({
    color: 'black',
    lineHeight: '30px',
    fontWeight: 600,
    width: '200px',
    overflowX: 'scroll',
    paddingLeft: '10px',
    whiteSpace: 'nowrap',
    textAlign: 'left',
})

const Img = styled.img({
    width: '40px',
    height: '50px',
    overflow: 'hidden',
    textAlign: 'left',
    padding: '5px',
    borderRadius: '10px',
    whiteSpace: 'nowrap',
})

interface Props {
    movie: {
        poster_path: string
        release_date: string
        id: number
        title: string
        movieId: string
    }
}

const ReleaseMovie: React.FC<Props> = ({ movie }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const selector = useSelector((state) => state)

    const displayUid = getUid(selector)
    const [message, setMessage] = useState(''),
        [upcoming, setSpan] = useState(0)

    useEffect(() => {
        const release = movie.release_date.split('-')
        const year = release[0]
        const month = release[1]
        const date = release[2]
        const releaseDate = `${year}/${month}/${date} 00:00:00`
        let today: any = new Date()
        const data: any = Date.parse(releaseDate)
        const item = data - today
        setSpan(item)
        console.log(item)
        if (item > 0) {
            if (item < 86400000) {
                setMessage('明日公開!!')
            } else if (item < 172800000) {
                setMessage('残り2日!')
            } else if (item < 259200000) {
                setMessage('残り3日!')
            } else if (item < 345600000) {
                setMessage('残り4日!')
            } else if (item < 432000000) {
                setMessage('残り5日!')
            } else if (item < 518400000) {
                setMessage('残り6日!')
            } else if (item < 604800000) {
                setMessage('残り7日!')
            }
        } else {
            if (item > -604800000) {
                setMessage('公開中')
            } else {
                db.collection('user').doc(displayUid).collection('notification').doc(movie.movieId).delete()
            }
        }
    }, [])

    return (
        <>
            {upcoming < 604800000 && (
                <Button className={classes.notification} onClick={() => dispatch(push('/movie/' + movie.id))}>
                    <Img src={movie.poster_path === null ? logo : URL_IMG + IMG_SIZE_XSMALL + movie.poster_path} />
                    <Div>
                        {movie.title}
                        <p>{message}</p>
                    </Div>
                </Button>
            )}
        </>
    )
}

export default ReleaseMovie
