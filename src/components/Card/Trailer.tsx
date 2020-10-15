import React from 'react'
import { URL_YOUTUBE } from '../../api'
import styled from 'styled-components';

const Div = styled.div({
    padding: "10px",
})

const Iframe = styled.iframe({
    borderRadius: '10px',
})

interface Props {
    trailer: {
        key: number
    }
}

const Trailer: React.FC<Props> = ({trailer}) => {
    return (
        <Div>
            <Iframe style={{borderRadius: '10px'}} title={URL_YOUTUBE + trailer.key} src={URL_YOUTUBE + trailer.key} allowFullScreen />
        </Div>
    )
}

export default Trailer
