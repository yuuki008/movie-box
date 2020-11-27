import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../../components'
import { resetPassword } from '../../redux/user/operations'

const Reset = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

    const inputEmail = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
        },
        [setEmail],
    )

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">Movie Box</h2>

            <TextInput
                fullWidth={true}
                label={'メールアドレス'}
                multiline={false}
                required={true}
                rows={1}
                value={email}
                type={'text'}
                onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton label="リセットメール送信" onClick={() => dispatch(resetPassword(email))} />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('/signup'))}>ユーザー登録がお済み出ない方はこちら</p>
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('/signin'))}>サインインはこちら</p>
            </div>
        </div>
    )
}

export default Reset
