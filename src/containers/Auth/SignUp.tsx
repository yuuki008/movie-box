import React, { useState, useCallback, useEffect } from 'react'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux'
import { API_KEY, URL_GENRE } from '../../api';
import { SelectBox, PrimaryButton, TextInput } from '../../components';
import { signUp } from '../../redux/user/operations';

const SignUp = () => {
    const dispatch = useDispatch()
    interface genre {
        id: number;
        name: string;
    }
    
    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [confirmPassword, setConfirmPassword] = useState(""),
          [genres, setGenres] = useState<genre[]>([]),
          [selected, setSelectedGenre] = useState<genre[]>([]);

    const selectGenre = (e: any, setCheck:any) => {
        const Genre = {name: e.target.name, id: e.target.id}
        const filteredGenres = selected.filter((g:genre) => g.id !== Genre.id)
        if(filteredGenres.length === selected.length){
            setSelectedGenre([
                ...filteredGenres,
                Genre,
            ])
            setCheck(true)
        }else{
            setSelectedGenre([
                ...filteredGenres
            ])
            setCheck(false)
        }
    }

    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername])

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword])

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    },[setConfirmPassword])

    useEffect(() => {
        const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
        fetch(url)
        .then(response => response.json())
        .then(json => setGenres(json.genres))
    },[])


    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">Movie Box</h2>
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <SelectBox label="好きなジャンル" genres={genres} required={false} selected={selected} select={selectGenre}/>
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"再確認パスワード"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <PrimaryButton
                    label="ユーザー登録"
                    onClick={() => dispatch(signUp(username, email, selected, password, confirmPassword))}
                />
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    )
}

export default SignUp
