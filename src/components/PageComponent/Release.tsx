import React, {useCallback, useEffect, useState} from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import { addNotification, fetchNotification, deleteNotification } from '../../redux/user/operations'
import {LightTooltip} from '../'
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications, getUid } from '../../redux/selectors';

const useStyles = makeStyles({
    notification:{
        height: 30,
        lineHeight: 30,
        width: 30,
        marginLeft: '10px',
        backgroundColor: 'rgb(3, 37, 65)',
        marginTop: '5px',
    },
    icon:{
        color: 'lightgray',
        width: '20px',
        height: '20px', 
    },
    color:{
        widht: '20px',
        height: '20px',
        color: 'yellow',
    }
})


interface Props {
    movie: any,
    notifications: any,
}
const Release:React.FC<Props> = ({movie, notifications}) => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const dispatch = useDispatch()

    const [notification, setNotification] = useState(false)

    const notificationToggle = useCallback((notification) => {
        setNotification(!notification)
    },[setNotification])


    useEffect(() => {
        if(notifications.length > 0){
            const list:any = []
            notifications.map((item:any) => {
                if(item.id === movie.id){
                    list.push(item)
                }
            })
            if(list.length > 0){
                setNotification(true)
            }else{
                setNotification(false)
            }
        } 
    },[notifications])
    return (
        !notification ? (
            <LightTooltip title="公開間際に通知" placement="top">
                <IconButton 
                className={classes.notification}
                onClick={() => {
                    notificationToggle(notification)
                    dispatch(addNotification(movie))
                }}
                >
                    <NotificationsIcon className={classes.icon}/>
                </IconButton>
            </LightTooltip>
        ):(
            <LightTooltip title="通知を無しにする" placement="top">
            <IconButton 
            className={classes.notification}
            onClick={() => {
                notificationToggle(notification)
                dispatch(deleteNotification(movie.id))
            }}
            >
                <NotificationsIcon className={classes.color}/>
            </IconButton>
        </LightTooltip>
        )
    )
}

export default Release
