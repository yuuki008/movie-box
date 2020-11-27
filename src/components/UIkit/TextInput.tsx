import { TextField } from '@material-ui/core'
import React from 'react'

type Props = {
    fullWidth: boolean
    label: string
    multiline: boolean
    required: boolean
    rows: number
    value: string
    type: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<Props> = (props: Props) => {
    return (
        <TextField
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
}

export default TextInput
