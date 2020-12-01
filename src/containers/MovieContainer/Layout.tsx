import React from 'react'
import styled from 'styled-components'

import { PageButton, DefaultCard, Genre } from '../../components'

type Props = {
  movies: Movie[]
  selectGenre: Genre[]
  toggleGenre: (genre: Genre) => void
  keyword: string
  page: number
  total_pages: number
  pageTitle: (path: string) => string | null
  changePage: (page: number) => false | void
  path: string
  isFetching: boolean
}
export const Layout = (props: Props) => {
  return (
    <Wrapper>
      <MoviesCategoryTitle>{props.pageTitle(props.path)}</MoviesCategoryTitle>
      {!props.keyword ? (
        <Genre selectGenre={props.selectGenre} toggleGenre={props.toggleGenre} />
      ) : (
        <HeadLabel>
          <Head>{decodeURI(props.keyword)}の検索結果</Head>
        </HeadLabel>
      )}
      {!props.isFetching ? (
        props.movies ? (
          <>
            <MovieWrapper>
              <MovieWrapper2>
                {props.movies.map((movie: Movie) => (
                  <DefaultCard
                    info
                    key={movie.id}
                    id={movie.id}
                    path={movie.poster_path}
                    title={movie.title}
                    name={movie.name}
                    voteAverage={movie.vote_average}
                    release_date={movie.release_date}
                    voteCount={movie.vote_count}
                    first_air_date={movie.first_air_date}
                  />
                ))}
              </MovieWrapper2>
            </MovieWrapper>
            {!props.keyword && props.page !== undefined && (
              <PageButton changePage={props.changePage} page={props.page} total_pages={props.total_pages} />
            )}
          </>
        ) : (
          <Head>Not found</Head>
        )
      ) : (
        <Head>ロード中</Head>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  paddingTop: '60px',
})

const MoviesCategoryTitle = styled.div({
  fontWeight: 600,
  fontSize: '18px',
  position: 'fixed',
  top: 90,
  left: 80,
})

const Head = styled.div({
  fontWeight: 600,
  fontSize: '22px',
  top: 50,
  margin: '60px auto',
})

const HeadLabel = styled.div({
  display: 'flex',
  maxWidth: '1320px',
  width: '80%',
  margin: '0 auto',
  height: '150px',
  borderBottom: '1px solid lightgray',
  marginBottom: '30px',
  position: 'relative',
})

const MovieWrapper = styled.div({
  display: 'flex',
  width: '100%',
  maxWidth: '1450px',
  height: 560,
  margin: '0 auto',
})

const MovieWrapper2 = styled.div({
  overflowX: 'scroll',
  display: 'flex',
  alignContent: 'center',
})
