import React from 'react'
import { URL_YOUTUBE } from '../../api'
import styled from 'styled-components'

type Props = {
  trailer: Trailer
}

const Trailer: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <Iframe title={URL_YOUTUBE + props.trailer.key} src={URL_YOUTUBE + props.trailer.key} allowFullScreen />
    </Wrapper>
  )
}

export default Trailer

const Wrapper = styled.div({
  padding: '10px',
})

const Iframe = styled.iframe({
  borderRadius: '10px',
})
