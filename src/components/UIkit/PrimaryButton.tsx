import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

type Props = {
    label: string
    onClick: () => void
}

const PrimaryButton: React.FC<Props> = (props: Props) => {
    const classes = useStyles()
    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}

export default PrimaryButton

const useStyles = makeStyles({
    button: {
        backgroundColor: 'rgb(3,37,65)',
        color: 'white',
        fontSize: '16px',
        height: '48px',
        marginButton: 16,
        width: 256,
        borderRadius: '20px',
    },
})
