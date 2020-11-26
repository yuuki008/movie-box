import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/styles'

interface Props {
    menu: { title: string; path: string; func: (path: string) => void }[]
    label: string
}
const MenuButton: React.FC<Props> = ({ menu, label }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const classes = useStyles()

    function handleClick(event: any) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget)
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button
                className={classes.button}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                onMouseOver={handleClick}>
                {label}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                className={classes.menu}>
                {menu.map((item: any) => (
                    <MenuItem
                        className={classes.list}
                        key={item.path}
                        onClick={() => {
                            item.func(item.path)
                            handleClose()
                        }}>
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default MenuButton

const useStyles = makeStyles({
    button: {
        color: 'white',
        fontSize: '18px',
        fontWeight: 600,
        marginRight: '8px',
    },
    menu: {
        marginTop: '30px',
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
    },
    list: {
        width: '100%',
        fontWeight: 600,
    },
})