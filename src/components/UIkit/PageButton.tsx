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
      <Button type="button" title="Previous 20 movies" onClick={() => props.changePage(prevPage)}>
        Prev
      </Button>
      <PageNumber>
        {props.page}/{props.total_pages}
      </PageNumber>
      <Button type="button" title="Next 20 movies" onClick={() => props.changePage(nextPage)}>
        Next
      </Button>
    </Wrapper>
  )
}

export default PageButton

const Wrapper = styled.div({
  margin: '20px auto 50px auto',
})

const PageNumber = styled.div({
  display: 'inline-block',
  widhth: '120px',
  textAlign: 'center',
  fontSize: '16px',
  ':nth-child(2)': {
    marginRight: '12px',
  },
})

const Button = styled.button({
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
})
