import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from './redux/selectors'
import { listenAuthState } from './redux/user/operations'
import {push} from 'connected-react-router';


interface  Props{
    children: any
}
const AuthWrapper:React.FC<Props> = ({children}) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const isSignedIn = getIsSignedIn(selector)
    const path = window.location.pathname

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    },[])

    if(!isSignedIn){
        if(path === '/mylist'){
            dispatch(push('/'))
            return children
        }
        return children
    }else{
        if(path === '/signin'){
            dispatch(push('/'))
        }
        return children
    }
}

export default AuthWrapper
