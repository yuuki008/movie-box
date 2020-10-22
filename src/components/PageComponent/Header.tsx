import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import '../../assets/search.css'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {push} from 'connected-react-router';
import { getIsSignedIn, getNotifications } from '../../redux/selectors';
import {fetchNotification, signOut} from '../../redux/user/operations'
import {MenuButton, Suggestion} from '../'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {IconButton, Badge } from '@material-ui/core';
import ReleaseMovie from '../UIkit/ReleaseMovie';
import Menu from '@material-ui/core/Menu'

const H2 = styled.h2({
  position: "absolute",
  top: 12,
  left: "47%",
})
 
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
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
    icon:{
      color: 'white',
      width: '23px',
      height: '23px',
    },
    menu:{
      marginTop: "30px",
      display: 'flex',
      alignItem: 'baseline',
      flexWrap: 'wrap',
      minHeight: '28px',
    },
  }));



const Header = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const selector = useSelector(state => state)

    const [anchorEl, setAnchorEl] = useState(null),
          [count, setCount] = useState("");

    const isSignedIn = getIsSignedIn(selector)
    const notifications = getNotifications(selector)

    const handleClick = (event:any) => {
      if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget);
      }
    }
  
    const handleClose = () =>  {
      setAnchorEl(null);
    }

    const selectMenu = (path:string) => {
      dispatch(push(path));
    };

    const signoutAction = () => {
      const ret = window.confirm('サインアウトしますか?')
      if(ret){
        dispatch(signOut())
      }
    }

    const menu = [
      {func: selectMenu,title: '新作公開', path: '/upcoming'},
      {func: selectMenu,title: '公開中', path: '/now_playing'},
      {func: selectMenu,title: '人気', path: '/'},
      {func: selectMenu,title: '高評価',path: '/top_rated'},
    ]

    const notSignInMenu = [
      {func: selectMenu,title: 'アカウント作成', path: '/signup'},
      {func: selectMenu,title: 'サインイン', path: '/signin'},
    ]

    const signInMenu = [
      {func: selectMenu,title: 'マイリスト', path: '/mylist'},
      {func: signoutAction,title: 'サインアウト', path: '/'},
    ]

    useEffect(() => {
      if(isSignedIn){
      dispatch(fetchNotification())
      }
    },[isSignedIn])

    const list:Array<any>= []
    useEffect(() => {
      const today:any = new Date()
      if(isSignedIn){
        setCount("")
        notifications.map((item:any) => {
          const release = item.release_date.split('-')
          const releaseDate = `${release[0]}/${release[1]}/${release[2]} 00:00:00`
          const data:any = Date.parse(releaseDate)
          const milliSecond = data - today
          if(milliSecond < 604800000){
            list.push(item)
          }  
        })
        setCount("!")
      }
    },[notifications])

    return (
        <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography 
            className={classes.title} variant="h6" noWrap
            >
              Movie Box
            </Typography>
            {!isSignedIn ? (
              
              <MenuButton menu={notSignInMenu} label="サインイン"/>
            ):(
              <>
              <IconButton
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                onMouseOver={handleClick}
              >
                <Badge badgeContent={"!"} color="primary">
                  <NotificationsIcon className={classes.icon} />
                </Badge>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{onMouseLeave: handleClose}}
                className={classes.menu}
              >
                {notifications.length > 0 ? (
                  notifications.map((item:any) => 
                    <ReleaseMovie key={item.movieId} movie={item}/>
                  )
                ):(
                  <div style={{padding: '5px'}}>
                    公開間際の作品はありません！
                  </div>
                )}
              </Menu>
              <MenuButton menu={signInMenu} label="アカウント"/>
              </>
            )}
            <MenuButton menu={menu} label="映画"/>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Suggestion/>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default Header;