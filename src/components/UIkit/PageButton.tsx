import React from 'react'
import styled from 'styled-components'

type Props = {
  changePage: (page: number) => void
  page: number
  total_pages: number
}

const PageButton: React.FC<Props> = (props: Props) => {
  const Page = props.page.toString()
  const prevPage = props.page - 1 <= 0 ? 1 : props.page - 1
  const nextPage = props.page + 1 > props.total_pages ? props.total_pages : parseInt(Page, 10) + parseInt('1', 10)
  return (
    <Wrapper>
      <button type="button" title="Previous 20 movies" onClick={() => props.changePage(prevPage)}>
        Prev
      </button>
      <div>
        {props.page}
        <span> / </span>
        {props.total_pages}
      </div>
      <button type="button" title="Next 20 movies" onClick={() => props.changePage(nextPage)}>
        Next
      </button>
    </Wrapper>
  )
}

export default PageButton

const Wrapper = styled.div({
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
