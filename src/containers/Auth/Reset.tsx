import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../../components'
import styled from 'styled-components'
import { resetPassword } from '../../redux/user/operations'

const Reset = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const inputEmail = useCallback(
    (value: string) => {
      setEmail(value)
    },
    [setEmail],
  )

  return (
    <Wrapper className="c-section-container">
      <ResetTitle className="u-text-center u-text__headline">Movie Box</ResetTitle>

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
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton label="リセットメール送信" onClick={() => dispatch(resetPassword(email))} />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => dispatch(push('/signup'))}>ユーザー登録がお済み出ない方はこちら</PageJump>
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => dispatch(push('/signin'))}>サインインはこちら</PageJump>
      </WrapperCenter>
    </Wrapper>
  )
}

export default Reset

const Wrapper = styled.div``
const ResetTitle = styled.div({
  fontWeight: 600,
})
const SpaceMedium = styled.div``
const WrapperCenter = styled.div``
const PageJump = styled.div``
