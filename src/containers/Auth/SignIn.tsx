import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../../components'
import { signIn } from '../../redux/user/operations'
import { push } from 'connected-react-router'
import styled from 'styled-components'

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <Wrapper className="c-section-container">
      <SignInTitle className="u-text-center u-text__headline">Movie Box</SignInTitle>

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
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton label="サインイン" onClick={() => dispatch(signIn(email, password))} />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => dispatch(push('/signup'))}>ユーザー登録がお済みでない方はこちら</PageJump>
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => dispatch(push('/reset'))}>パスワードを忘れた方はこちら</PageJump>
      </WrapperCenter>
    </Wrapper>
  )
}

export default SignIn

const SignInTitle = styled.div({
  fontWeight: 600,
})
const Wrapper = styled.div``
const WrapperCenter = styled.div``
const SpaceMedium = styled.div``
const PageJump = styled.div``
