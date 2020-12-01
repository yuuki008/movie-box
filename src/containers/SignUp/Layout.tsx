import React from 'react'
import { SelectBox, PrimaryButton, TextInput } from '../../components'
import styled from 'styled-components'
import { push } from 'connected-react-router'

type Props = {
  inputUsername: (value: string) => void
  inputEmail: (value: string) => void
  inputPassword: (value: string) => void
  inputConfirmPassword: (value: string) => void
  selectGenre: (genre: Genre, setCheck: React.Dispatch<React.SetStateAction<boolean>>) => void
  username: string
  email: string
  password: string
  confirmPassword: string
  genres: Genre[]
  dispatch: React.Dispatch<unknown>
  signUp: (username: string, email: string, password: string, confirmPassword: string, myGenres: Genre[]) => void
  myGenres: Genre[]
}

export const Layout = (props: Props) => {
  return (
    <Wrapper className="c-section-container">
      <SignUpTitle className="u-text-center u-text__headline">Movie Box</SignUpTitle>
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={props.username}
        type={'text'}
        onChange={props.inputUsername}
      />
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
      <SelectBox
        label="好きなジャンル"
        genres={props.genres}
        required={false}
        selected={props.myGenres}
        select={props.selectGenre}
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
      <TextInput
        fullWidth={true}
        label={'再確認パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={props.confirmPassword}
        type={'password'}
        onChange={props.inputConfirmPassword}
      />
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton
          label="ユーザー登録"
          onClick={() =>
            props.dispatch(
              props.signUp(props.username, props.email, props.password, props.confirmPassword, props.myGenres),
            )
          }
        />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => props.dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</PageJump>
      </WrapperCenter>
    </Wrapper>
  )
}

const SignUpTitle = styled.div({
  fontWeight: 600,
})
const Wrapper = styled.div``
const WrapperCenter = styled.div``
const SpaceMedium = styled.div``
const PageJump = styled.div``
