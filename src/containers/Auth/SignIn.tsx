import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TextInput, PrimaryButton} from '../../components'
import { signIn } from '../../redux/user/operations';
import {push} from 'connected-react-router';
import {getIsSignedIn} from '../../redux/selectors';

const SignIn = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('');

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword])
    

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">Movie Box</h2>

            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <PrimaryButton
                    label="サインイン"
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/signup'))}>ユーザー登録がお済みでない方はこちら</p>
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/reset'))}>パスワードを忘れた方はこちら</p>
            </div>
        </div>
    )
}

export default SignIn
