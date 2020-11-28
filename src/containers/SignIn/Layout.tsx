import React from 'react'
import { TextInput, PrimaryButton } from '../../components'
import styled from 'styled-components'

type Props = {
  inputEmail: (value: string) => void
  inputPassword: (value: string) => void
  email: string
  password: string
  signIn: (email: string, password: string) => void
  dispatch: any
  push: any
}

export const Layout = (props: Props) => {
  return (
    <Wrapper className="c-section-container">
      <SignInTitle className="u-text-center u-text__headline">Movie Box</SignInTitle>

      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={props.email}
        type={'text'}
        onChange={props.inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={props.password}
        type={'password'}
        onChange={props.inputPassword}
      />
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton label="サインイン" onClick={() => props.dispatch(props.signIn(props.email, props.password))} />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => props.dispatch(props.push('/signup'))}>ユーザー登録がお済みでない方はこちら</PageJump>
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => props.dispatch(props.push('/reset'))}>パスワードを忘れた方はこちら</PageJump>
      </WrapperCenter>
    </Wrapper>
  )
}

const SignInTitle = styled.div({
  fontWeight: 600,
})
const Wrapper = styled.div``
const WrapperCenter = styled.div``
const SpaceMedium = styled.div``
const PageJump = styled.div``
