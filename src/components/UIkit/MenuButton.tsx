import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/styles'
import styled from 'styled-components'

type Props = {
  menu: { title: string; path: string; func: (path: string) => void }[]
  label: string
}
const MenuButton: React.FC<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const classes = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Wrapper>
      <Button
        className={classes.button}
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        {props.label}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}>
        {props.menu.map((item: any) => (
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
    </Wrapper>
  )
}

export default MenuButton

const Wrapper = styled.div({
  height: 'auto',
})

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
