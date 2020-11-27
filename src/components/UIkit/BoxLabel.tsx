import React, { useState, useEffect } from 'react'
import { FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles'

type Props = {
    genre: Genre
    select: (genre: Genre, setCheck: React.Dispatch<React.SetStateAction<boolean>>) => void
    selected: Genre[]
}

const BoxLabel: React.FC<Props> = (props: Props) => {
    const [check, setCheck] = useState(false)
    const classes = useStyles()
    useEffect(() => {
        if (props.selected.length > 0) {
            const checkItem = props.selected.filter((item: Genre) => item.id === props.genre.id)
            if (checkItem.length > 0) {
                setCheck(true)
            } else setCheck(false)
        } else {
            setCheck(false)
        }
    }, [])

    return (
        <FormControlLabel
            className={classes.check}
            label={props.genre.name}
            control={
                <Checkbox
                    name={props.genre.name}
                    id={props.genre.id.toString()}
                    color="default"
                    className={classes.box}
                    onChange={() => props.select(props.genre, setCheck)}
                    checked={check}
                />
            }
        />
    )
}

export default BoxLabel

const useStyles = makeStyles({
    check: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        padding: '5px',
    },
    box: {
        display: 'flex',
    },
})
