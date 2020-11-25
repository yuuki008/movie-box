import React, { useState, useEffect } from 'react'
import { FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles'

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

interface genre {
    id: number
    name: string
}

interface Props {
    genre: any
    select: (e: any, setCheck: any) => void
    selected: genre[]
}

const BoxLabel: React.FC<Props> = ({ genre, selected, select }) => {
    const [check, setCheck] = useState(false)
    const classes = useStyles()
    console.log(selected)
    useEffect(() => {
        if (selected.length > 0) {
            const checkItem = selected.filter((item: any) => item.id === genre.id)
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
            label={genre.name}
            control={
                <Checkbox
                    name={genre.name}
                    id={genre.id}
                    color="default"
                    className={classes.box}
                    onChange={(e) => select(e, setCheck)}
                    checked={check}
                />
            }
        />
    )
}

export default BoxLabel
