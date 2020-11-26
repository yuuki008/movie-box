import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import BoxLabel from './BoxLabel'
import Chip from '@material-ui/core/Chip'

interface genre {
    id: number
    name: string
}

interface Props {
    label: string
    genres: genre[]
    select: (e: any, setCheck: any) => void
    required: boolean
    selected: genre[]
}

const SelectBox: React.FC<Props> = ({ label, genres, select, required, selected }) => {
    const classes = useStyles()
    const name = selected.map((g: any) => g.name).join(' | ')
    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                required={required}
                value={name}
                renderValue={() => (
                    <div className={classes.chips}>
                        <Chip label={name} className={classes.chip} />
                    </div>
                )}>
                {genres.map((genre: genre) => (
                    <BoxLabel key={genre.id} genre={genre} selected={selected} select={select} />
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectBox

const useStyles = makeStyles({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        maxWidth: '1200px',
        width: '100%',
    },
    chips: {
        display: 'flex',
        overflowX: 'scroll',
    },
    chip: {
        margin: 2,
    },
})
