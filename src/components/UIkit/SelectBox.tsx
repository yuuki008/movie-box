import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import BoxLabel from './BoxLabel'
import Chip from '@material-ui/core/Chip'
import styled from 'styled-components'

type Props = {
  label: string
  genres: Genre[]
  select: (genre: Genre, setCheck: React.Dispatch<React.SetStateAction<boolean>>) => void
  required: boolean
  selected: Genre[]
}

const SelectBox: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const name = props.selected.map((g: any) => g.name).join(' | ')
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={name}
        renderValue={() => (
          <ChipsWrapper>
            <Chip label={name} className={classes.chip} />
          </ChipsWrapper>
        )}>
        {props.genres.map((genre: Genre) => (
          <BoxLabel key={genre.id} genre={genre} selected={props.selected} select={props.select} />
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
  chip: {
    margin: 2,
  },
})

const ChipsWrapper = styled.div({
  display: 'flex',
  overflowX: 'scroll',
})
