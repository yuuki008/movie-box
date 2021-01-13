import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { MenuButton, Suggestion } from '../../'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { IconButton, Badge } from '@material-ui/core'
import { ReleaseMovie } from '../..'
import Menu from '@material-ui/core/Menu'
import styled from 'styled-components'

type MenuObject = {
  func: (path: string) => void
  title: string
  path: string
}

type Props = {
  isSignedIn: boolean
  notifications: Movie[]
  anchorEl: HTMLElement | null
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleClose: () => void
  signOutAction: () => void
  menu: MenuObject[]
  notSignInMenu: MenuObject[]
  signInMenu: MenuObject[]
}

export const Layout = (props: Props) => {
  const classes = useStyles()
  return (
    <Wrapper>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Movie Box
          </Typography>
          {!props.isSignedIn ? (
            <MenuButton menu={props.notSignInMenu} label="サインイン" />
          ) : (
            <>
              <IconButton
                aria-owns={props.anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={props.handleClick}>
                <Badge badgeContent={'!'} color="primary">
                  <NotificationsIcon className={classes.icon} />
                </Badge>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={props.anchorEl}
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
                className={classes.menu}>
                {props.notifications.length > 0 ? (
                  props.notifications.map((item: Movie) => <ReleaseMovie key={item.movieId} movie={item} />)
                ) : (
                  <NonMovie>公開間際の作品はありません！</NonMovie>
                )}
              </Menu>
              <MenuButton menu={props.signInMenu} label="アカウント" />
            </>
          )}
          <MenuButton menu={props.menu} label="映画" />
          <SearchWrapper className={classes.search}>
            <SearchIconWrapper className={classes.searchIcon}>
              <SearchIcon />
            </SearchIconWrapper>
            <Suggestion />
          </SearchWrapper>
        </Toolbar>
      </AppBar>
    </Wrapper>
  )
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: 14,
    fontWeight: 700,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  icon: {
    color: 'white',
    width: '23px',
    height: '23px',
  },
  menu: {
    marginTop: '30px',
    display: 'flex',
    alignItem: 'baseline',
    flexWrap: 'wrap',
    minHeight: '28px',
  },
}))

const Wrapper = styled.div({
  flexGrow: 1,
  backgroundColor: 'rgb(3,37,65) !important',
})

const SearchWrapper = styled.div``

const SearchIconWrapper = styled.div``

const NonMovie = styled.div({
  padding: '5px',
})
