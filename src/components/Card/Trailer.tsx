import React from 'react'
import { URL_YOUTUBE } from '../../api'
import styled from 'styled-components'

interface Props {
    trailer: {
        key: number
    }
}

const Trailer: React.FC<Props> = ({ trailer }) => {
    return (
        <Wrapper>
            <Iframe title={URL_YOUTUBE + trailer.key} src={URL_YOUTUBE + trailer.key} allowFullScreen />
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
