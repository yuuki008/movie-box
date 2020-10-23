import React, {useState, useCallback, useEffect} from 'react'
import { addFavoriteMovie, deleteFavoriteMovie } from '../../redux/user/operations'
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {Notification, LightTooltip} from '../'



const useStyles = makeStyles({
    iconButton:{
        height: 30,
        lineHeight: 30,
        width: 30,
        marginTop: '5px',
        backgroundColor: 'rgb(3,37,65)',
        marginRight: '10px',
    },
    color:{
        color: 'red',
        width: '15px',
        height: '15px',
    },
    tooltip:{
        backgroundColor: 'white',
        color: 'black',
    },
    icon:{
        width: '15px',
        height: '15px',
        color: 'lightgray',
    }
})
interface movie{
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: {id: number; name: string}[];
    overview: string;
    timestamp: string;
    vote_average: number;
}

interface Props {
    movie: movie;
    favorites: movie[];
}

const Favorite:React.FC<Props> = ({movie, favorites}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false),
          [open, setOpen] = useState(false);

    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen])

    const favoriteToggle = useCallback((favorite) => {
        setFavorite(!favorite)
    },[setFavorite, favorite])

    useEffect(() => {
        if(favorites.length > 0){
            const list:any = []
            favorites.map((item:any)=> {
                if(item.id === movie.id){
                    list.push(item)
                }
            })
            if(list.length > 0){
                setFavorite(true)
            }else{
                setFavorite(false)
            }
        }
    },[favorites])

    return (
            <div className="movie__favorite">
                {favorite ? (
                    <LightTooltip 
                    placement="top"
                    title="お気に入りから削除">
                        <IconButton className={classes.iconButton}
                        onClick={() => {
                            favoriteToggle(favorite)
                            dispatch(deleteFavoriteMovie(movie.id))
                        }}
                        >
                            <FavoriteIcon className={classes.color} />
                        </IconButton>
                    </LightTooltip>
                ):(
                    <LightTooltip 
                    title="お気に入りに追加"
                    placement="top"
                    >
                        <IconButton className={classes.iconButton}
                        onClick={() => {
                            favoriteToggle(favorite)
                            setOpen(true)
                            dispatch(addFavoriteMovie(movie))
                        }}
                        >
                            <FavoriteIcon className={classes.icon}/>
                        </IconButton>
                    </LightTooltip>
                )}
                <Notification open={open} handleClose={handleClose} label='お気に入りへ追加しました。' />
            </div>
    )
}

export default Favorite
