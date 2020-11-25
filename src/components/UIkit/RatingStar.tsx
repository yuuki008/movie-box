import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    star: {
        margin: 0,
    },
})

interface Props {
    voteAverage: number
    voteCount: number
}

const RatingStar: React.FC<Props> = ({ voteAverage, voteCount }) => {
    const classes = useStyles()
    return (
        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.star}>
            <Typography component="legend">
                {voteAverage}
                <span style={{ padding: '20px', color: 'white', fontSize: '13px' }}>投票数:{voteCount}</span>
            </Typography>
            <Rating name="half-rating-read" defaultValue={voteAverage} max={10} precision={0.5} readOnly size="small" />
        </Box>
    )
}

export default RatingStar
