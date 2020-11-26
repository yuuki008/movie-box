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

interface Props {
    cast: {
        name: string
        content: string
        id: number
        profile_path: string
        character: string
    }
}

const Cast: React.FC<Props> = ({ cast }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div style={{ width: '138px', margin: '10px' }}>
            <Card className={classes.root}>
                <LightTooltip title={cast.name}>
                    <CardActionArea onClick={() => dispatch(push('/actor/' + cast.id))}>
                        <CardMedia
                            className={classes.media}
                            image={
                                cast.profile_path !== null
                                    ? URL_IMG + 'w138_and_h175_face/' + cast.profile_path.slice(1)
                                    : NoImage
                            }
                            title={cast.character}
                        />
                        <CardContent className={classes.content}>
                            <Typography className={classes.name}>{cast.name}</Typography>
                            <Typography className={classes.character}>{cast.character}</Typography>
                        </CardContent>
                    </CardActionArea>
                </LightTooltip>
            </Card>
        </div>
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
