import React, { useState, useCallback, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { API_KEY, URL_GENRE } from '../../api'
import { SelectBox, PrimaryButton, TextInput } from '../../components'
import { signUp } from '../../redux/user/operations'

const SignUp = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [myGenres, setMyGenres] = useState<Genre[]>([])
    //mapとfilterしたときにわざわざ型定義しなくていい

    const selectGenre = (genre: Genre, setCheck: React.Dispatch<React.SetStateAction<boolean>>) => {
        const filteredGenres = myGenres.filter((g) => g.id !== genre.id)
        if (filteredGenres.length === myGenres.length) {
            setMyGenres([...filteredGenres, genre])
            setCheck(true)
        } else {
            setMyGenres([...filteredGenres])
            setCheck(false)
        }
    }

    const inputUsername = useCallback(
        (value: string) => {
            setUsername(value)
        },
        [setUsername],
    )

    const inputEmail = useCallback(
        (value: string) => {
            setEmail(value)
        },
        [setEmail],
    )

    const inputPassword = useCallback(
        (value: string) => {
            setPassword(value)
        },
        [setPassword],
    )

    const inputConfirmPassword = useCallback(
        (value: string) => {
            setConfirmPassword(value)
        },
        [setConfirmPassword],
    )

    useEffect(() => {
        const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
        fetch(url)
            .then((response) => response.json())
            .then((json) => setGenres(json.genres))
    }, [])

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">Movie Box</h2>
            <TextInput
                fullWidth={true}
                label={'ユーザー名'}
                multiline={false}
                required={true}
                rows={1}
                value={username}
                type={'text'}
                onChange={inputUsername}
            />
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
            <SelectBox
                label="好きなジャンル"
                genres={genres}
                required={false}
                selected={myGenres}
                select={selectGenre}
            />
            <TextInput
                fullWidth={true}
                label={'パスワード'}
                multiline={false}
                required={true}
                rows={1}
                value={password}
                type={'password'}
                onChange={inputPassword}
            />
            <TextInput
                fullWidth={true}
                label={'再確認パスワード'}
                multiline={false}
                required={true}
                rows={1}
                value={confirmPassword}
                type={'password'}
                onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label="ユーザー登録"
                    onClick={() => dispatch(signUp(username, email, myGenres, password, confirmPassword))}
                />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    )
}

export default SignUp
