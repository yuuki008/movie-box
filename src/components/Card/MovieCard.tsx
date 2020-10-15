import { Card, CardActionArea, CardMedia, makeStyles, Typography, CardContent } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import {push} from 'connected-react-router'
import { URL_IMG } from '../../api'
import NoImage from '../../assets/images/no_image.png'
import LightTooltip  from '../UIkit/LightTooltip';

const useStyles = makeStyles({
    root:{
        width: "250px",
        borderRadius: '10px',
    },
    media:{
        height: 141,
        width: 250,
    },
    content:{
        hight: "30px",
    },
    name:{
        height: "30px",
        fontWeight: 600,
    },
    date:{
        fontSize: "13px",
        fontWeight: 300,
        float: 'right'
    },
    action:{
        borderRadius: '10px'
    }
})

interface Props {
    movie: {
        id: number, 
        poster_path: string;
        title: string;
        release_date: string;
        backdrop_path: string;
    }
}
const MovieCard:React.FC<Props> = ({movie}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div style={{width: "250px", padding: '15px'}}>
            <LightTooltip title={movie.title} >
                <CardActionArea className={classes.action}>
                <Card className={classes.root}
                    onClick={() => dispatch(push('/movie/' + movie.id))}
                >
                    <CardMedia
                    className={classes.media}
                    image={movie.backdrop_path !== null ? (URL_IMG +'w250_and_h141_face/'+ movie.backdrop_path):(NoImage)}
                    />
                </Card>   
                <CardContent className={classes.content}>
                    <Typography className={classes.name}>
                        {movie.title}
                    </Typography>
                    <Typography className={classes.date}>
                        {movie.release_date}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </LightTooltip>
        </div>
    )
}

export default MovieCard

