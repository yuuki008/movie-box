import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActorDetail, getMovieList } from '../redux/selectors'
import { fetchActorDetail } from '../redux/actor/operations'
import { fetchActorMovieList } from '../redux/movielist/operations'
import { URL_IMG } from '../api'
import NoImage from '../assets/images/no_image.png'
import { MovieCard2 } from '../components'
import styled from 'styled-components'

interface movie {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    genres: { id: number; name: string }[]
    overview: string
    timestamp: string
    vote_average: number
}

const Actor = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const actor = getActorDetail(selector)
    const movies = getMovieList(selector)
    const id = window.location.pathname.split('/actor/')[1]

    const gender = (gender: number) => {
        if (gender === 1) {
            return '女性'
        } else if (gender === 2) {
            return '男性'
        } else {
            return '不明'
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchActorDetail(id))
            dispatch(fetchActorMovieList(id))
        }
    }, [])

    return movies.isFetching || actor.isFetching ? (
        <h3 style={{ padding: '30px' }}>LOADING</h3>
    ) : (
        <Div1>
            <Div2>
                <DivPoster>
                    <Img src={actor.item.profile_path ? URL_IMG + 'w342/' + actor.item.profile_path : NoImage} />
                    <Ul>
                        <Li>
                            {actor.item.place_of_birth !== null && (
                                <>
                                    <h4>出生地</h4>
                                    {actor.item.place_of_birth}
                                </>
                            )}
                        </Li>
                        <Li>
                            <h4>性別</h4>
                            {gender(actor.item.gender)}
                        </Li>
                        <Li>
                            {actor.item.birthday !== null && (
                                <>
                                    <h4>誕生日</h4>
                                    {actor.item.birthday}
                                </>
                            )}
                        </Li>
                    </Ul>
                </DivPoster>
                <DivInfo>
                    <H3>
                        {actor.item.name}
                        {actor.item.gender !== 0 && <Span>{actor.item.gender === 1 ? 'female' : 'male'}</Span>}
                    </H3>
                    <DivBiography>
                        {actor.item.biography !== '' && (
                            <>
                                <h3>経歴</h3>
                                <DivBiography2>
                                    <p>{actor.item.biography}</p>
                                </DivBiography2>
                            </>
                        )}
                    </DivBiography>
                    <DivMovies>
                        <h3>作品</h3>
                        <DivMovies2>
                            {movies.items.map((movie: movie) => (
                                <MovieCard2 movie={movie} key={movie.id} />
                            ))}
                        </DivMovies2>
                    </DivMovies>
                </DivInfo>
            </Div2>
        </Div1>
    )
}

export default Actor

const Div1 = styled.div({
    paddingTop: '60px',
})

const Div2 = styled.div({
    display: 'flex',
    maxWidth: '1300px',
    padding: '40px',
    width: '100%',
    margin: '0 auto',
})

const DivPoster = styled.div({
    display: 'flex',
    flexDirection: 'column',
})

const Img = styled.img({
    width: '300px',
    borderRadius: '10px',
    height: '450px',
})

const Ul = styled.ul({
    marginTop: '15px',
    listStyle: 'none',
    padding: '40px',
})

const Li = styled.li({
    paddingBottom: '10px',
})

const DivInfo = styled.div({
    position: 'relative',
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    paddingLeft: '40px',
    width: '70%',
})

const H3 = styled.h3({
    width: '100%',
})

const Span = styled.span({
    fontWeight: 400,
    fontSize: '20px',
    color: 'gray',
    paddingLeft: '20px',
    height: '33px',
    lineHeight: '33px',
    flexWrap: 'wrap',
})

const DivBiography = styled.div({
    marginTop: '40px',
    width: '100%',
})

const DivBiography2 = styled.div({
    padding: '20px',
    height: '200px',
    backgroundColor: 'white',
    overflowY: 'scroll',
    lineHeight: '1.4rem',
    flexWrap: 'wrap',
})

const DivMovies = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
})

const DivMovies2 = styled.div({
    borderTop: '2px solid lightgray',
    paddingTop: '15px',
    display: 'flex',
    height: '270px',
    overflowX: 'scroll',
    overflowY: 'hidden',
})
