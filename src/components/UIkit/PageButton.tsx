import React from 'react'
import styled from 'styled-components'

interface Props {
    changePage: (page: number) => void
    page: number
    total_pages: number
}

const PageButton: React.FC<Props> = ({ changePage, page, total_pages }) => {
    const Page = page.toString()
    const prevPage = page - 1 <= 0 ? 1 : page - 1
    const nextPage = page + 1 > total_pages ? total_pages : parseInt(Page, 10) + parseInt('1', 10)
    return (
        <Div>
            <button type="button" title="Previous 20 movies" onClick={() => changePage(prevPage)}>
                Prev
            </button>
            <div>
                {page}
                <span> / </span>
                {total_pages}
            </div>
            <button type="button" title="Next 20 movies" onClick={() => changePage(nextPage)}>
                Next
            </button>
        </Div>
    )
}

export default PageButton

const Div = styled.div({
    margin: '20px auto 50px auto',
    div: {
        display: 'inline-block',
        widhth: '120px',
        textAlign: 'center',
        fontSize: '20px',
        ':nth-child(2)': {
            marginRight: '12px',
        },
    },
    button: {
        display: 'inline-block',
        fontSize: '16px',
        padding: '8px 16px',
        backgroundColor: 'rgb(3,37,65) !important',
        border: '1px solid black',
        borderRadius: '0.2em',
        width: '70px',
        ':nth-child(1)': {
            color: '#b3b3b3',
            marginRight: '12px',
        },
        ':nth-child(3)': {
            color: '#ffffff',
        },
    },
})
