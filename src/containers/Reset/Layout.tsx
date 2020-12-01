import React from 'react'
import { TextInput, PrimaryButton } from '../../components'
import styled from 'styled-components'
import { push } from 'connected-react-router'

type Props = {
  email: string
  inputEmail: (value: string) => void
  dispatch: React.Dispatch<unknown>
  resetPassword: (email: string) => void
}

export const Layout = (props: Props) => {
  return (
    <Wrapper className="c-section-container">
      <ResetTitle className="u-text-center u-text__headline">Movie Box</ResetTitle>

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
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton label="リセットメール送信" onClick={() => props.dispatch(props.resetPassword(props.email))} />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => props.dispatch(push('/signup'))}>ユーザー登録がお済み出ない方はこちら</PageJump>
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => props.dispatch(push('/signin'))}>サインインはこちら</PageJump>
      </WrapperCenter>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const ResetTitle = styled.div({
  fontWeight: 600,
})
const SpaceMedium = styled.div``
const WrapperCenter = styled.div``
const PageJump = styled.div``
