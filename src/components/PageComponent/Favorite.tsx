import React, { useState, useCallback, useEffect } from 'react'
import { addFavoriteMovie, deleteFavoriteMovie } from '../../redux/user/operations'
import { useDispatch } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { Notification, LightTooltip } from '../'

type Props = {
    movie: Movie
    favorites: Movie[]
}

const Favorite: React.FC<Props> = (props: Props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const favoriteToggle = useCallback(
        (favorite: boolean) => {
            setFavorite(!favorite)
        },
        [setFavorite, favorite],
    )

    useEffect(() => {
        if (props.favorites.length > 0) {
            const list = []
            props.favorites.map((item: Movie) => {
                if (item.id === props.movie.id) {
                    list.push(item)
                }
            })
            if (list.length > 0) {
                setFavorite(true)
            } else {
                setFavorite(false)
            }
        }
    }, [props.favorites])

    return (
        <div className="movie__favorite">
            {favorite ? (
                <LightTooltip placement="top" title="お気に入りから削除">
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => {
                            favoriteToggle(favorite)
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
                            favoriteToggle(favorite)
                            setOpen(true)
                            dispatch(addFavoriteMovie(props.movie))
                        }}>
                        <FavoriteIcon className={classes.icon} />
                    </IconButton>
                </LightTooltip>
            )}
            <Notification open={open} handleClose={handleClose} label="お気に入りへ追加しました。" />
        </div>
    )
}

export default Favorite

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
