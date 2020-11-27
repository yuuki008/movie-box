import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

type Props = {
    handleClose: () => void
    open: boolean
    label: string
}

const Notification: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={props.open}
                message={props.label}
                autoHideDuration={6000}
                onClose={props.handleClose}
                action={
                    <>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </div>
    )
}

export default Notification
