import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getMovieList } from '../redux/selectors'
import { searchMovieList, fetchMovieList } from '../redux/movielist/operations'
import {
    API_GET_MOVIE_NOW_PLAYING,
    API_GET_MOVIE_POPULAR,
    API_GET_MOVIE_TOP_RATED,
    API_GET_MOVIE_UPCOMING,
} from '../api'
import { PageButton, DefaultCard, Genre } from '../components'

const MovieContainer = () => {
    type genre = {
        id: number
        name: string
    }
    const selector = useSelector((state) => state)
    const dispatch = useDispatch()
    const movielist = getMovieList(selector)
    const movies = movielist.items
    const isFetching = movielist.isFetching
    const total_pages = movielist.total_pages
    const page = movielist.page
    const [selectGenre, setSelectGenre] = useState<genre[]>([])
    const path = window.location.pathname
    const keyword = path.split('/search/')[1]

    const pageTitle = (path: string) => {
        switch (path) {
            case (path = '/upcoming'):
                return '新作'
            case (path = '/'):
                return '人気'
            case (path = '/top_rated'):
                return '高評価'
            case (path = '/now_playing'):
                return '公開中'
            default:
                return null
        }
    }
    const toggleGenre = (genre: genre) => {
        const filteredGenres = selectGenre.filter((g: genre) => g.id !== genre.id)
        if (filteredGenres.length === selectGenre.length) {
            setSelectGenre([...filteredGenres, genre])
        } else {
            setSelectGenre([...filteredGenres])
        }
    }

    const changePage = (page: number) => {
        if (page === 0) {
            alert('該当の作品はありませんでした。')
            return false
        }
        const newPage = page.toString()
        if (newPage === 'NaN') {
            return false
        } else {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem('currentPage', JSON.stringify(page))
            }
            const GenresID = selectGenre.map((g: genre) => g.id)
            if (path === '/') {
                dispatch(fetchMovieList(API_GET_MOVIE_POPULAR, GenresID, page))
            } else if (path === '/upcoming') {
                dispatch(fetchMovieList(API_GET_MOVIE_UPCOMING, GenresID, page))
            } else if (path === '/now_playing') {
                dispatch(fetchMovieList(API_GET_MOVIE_NOW_PLAYING, GenresID, page))
            } else if (path === '/top_rated') {
                dispatch(fetchMovieList(API_GET_MOVIE_TOP_RATED, GenresID, page))
            }
        }
    }

    useEffect(() => {
        if (keyword) {
            dispatch(searchMovieList(keyword))
        }
    }, [keyword])

    useEffect(() => {
        const genreIDs = selectGenre.map((g: genre): number => {
            return g.id
        })
        if (path === '/') {
            dispatch(fetchMovieList(API_GET_MOVIE_POPULAR, genreIDs))
        } else if (path === '/upcoming') {
            dispatch(fetchMovieList(API_GET_MOVIE_UPCOMING, genreIDs))
        } else if (path === '/now_playing') {
            dispatch(fetchMovieList(API_GET_MOVIE_NOW_PLAYING, genreIDs))
        } else if (path === '/top_rated') {
            dispatch(fetchMovieList(API_GET_MOVIE_TOP_RATED, genreIDs))
        }
    }, [selectGenre, path])

    return (
        <Wrapper>
            <h2 style={{ position: 'fixed', top: 90, left: 80 }}>{pageTitle(path)}</h2>
            {!keyword ? (
                <Genre selectGenre={selectGenre} toggleGenre={toggleGenre} />
            ) : (
                <HeadLabel>
                    <Head>{decodeURI(keyword)}の検索結果</Head>
                </HeadLabel>
            )}
            {!isFetching ? (
                movies !== undefined || movies.length > 0 ? (
                    <>
                        <MovieWrapper>
                            <MovieWrapper2>
                                {movies.map((movie: any) => (
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
                        {!keyword && page !== undefined && (
                            <PageButton changePage={changePage} page={page} total_pages={total_pages} />
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

export default MovieContainer

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: '60px',
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
