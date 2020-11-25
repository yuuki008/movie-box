import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCastList } from '../redux/castlist/operations'
import { fetchMovieDetail } from '../redux/movie/operations'
import { fetchTrailerList } from '../redux/trailerlist/operations'
import {
    getCastList,
    getFavorite,
    getIsSignedIn,
    getMovieDetail,
    getMovieList,
    getNotifications,
    getTrailerList,
    getUid,
} from '../redux/selectors'
import { IMG_SIZE_LARGE, URL_IMG } from '../api'
import NoImage from '../assets/images/no_image.png'
import { fetchSimilarMovies } from '../redux/movielist/operations'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/styles'
import { fetchFavoriteMovie, fetchNotification } from '../redux/user/operations'
import { MovieCard, RatingStar, Cast, Trailer, FolderList, Favorite, Release } from '../components'

export interface Image {
    backdropImage: string
}

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

interface cast {
    name: string
    content: string
    id: number
    profile_path: string
    character: string
}

const MovieDetail = () => {
    const selector = useSelector((state) => state)
    const dispatch = useDispatch()

    const movie = getMovieDetail(selector)
    const casts = getCastList(selector)
    const trailers = getTrailerList(selector)
    const movies = getMovieList(selector)
    const isSignedIn = getIsSignedIn(selector)
    const favorites = getFavorite(selector)
    const uid = getUid(selector)
    const notifications = getNotifications(selector)

    const id = window.location.pathname.split('/movie/')[1]

    const [released, setReleased] = useState(false)

    const backdropImage = `url(https://image.tmdb.org/t/p/original${movie.item.backdrop_path})`
    let year
    if (typeof movie.item.release_date === 'string') {
        year = movie.item.release_date.split('-')[0]
    }

    const stringmethod = (str: string) => {
        if (str !== undefined) {
            const date = str.substr(0, 4) + '年' + str.substr(5, 2) + '月' + str.substr(8, 2) + '日'
            return date
        }
    }

    const usePrevious = (value: string) => {
        const ref = useRef<string>()
        useEffect(() => {
            ref.current = value
        })
        return ref.current
    }
    const prevId = usePrevious(id)

    useEffect(() => {
        if (id && prevId !== id) {
            dispatch(fetchMovieDetail(id))
            dispatch(fetchCastList(id))
            dispatch(fetchTrailerList(id))
        }
    }, [id])

    useEffect(() => {
        if (uid !== '' && isSignedIn) {
            dispatch(fetchFavoriteMovie(uid))
            dispatch(fetchNotification())
        }
    }, [uid])

    useEffect(() => {
        if (movie.item.release_date !== undefined) {
            const release = movie.item.release_date.split('-')
            const year = release[0]
            const month = release[1]
            const date = release[2]
            const releaseDate = `${year}/${month}/${date} 00:00:00`
            let today: any = new Date()
            const data: any = Date.parse(releaseDate)
            if (data < today) {
                setReleased(true)
            } else {
                setReleased(false)
            }
        }
        if (movie.item !== {}) {
            dispatch(fetchSimilarMovies(movie.item.id))
        }
    }, [movie])

    return movie.isFetching || casts.isFetching || trailers.isFetching ? (
        <h2 style={{ padding: '40px' }}>LOADING</h2>
    ) : (
        <>
            <Div backdropImage={backdropImage}>
                <DivWrapper>
                    <DivDetail>
                        <DivImage>
                            <img
                                src={
                                    movie.item.poster_path !== null
                                        ? URL_IMG + IMG_SIZE_LARGE + movie.item.poster_path
                                        : NoImage
                                }
                            />
                        </DivImage>
                        <DivInfo>
                            <DivInfo2>
                                <DivTitle>
                                    <DivTitle2>
                                        <h3>
                                            {movie.item.title}
                                            <span>({year})</span>
                                        </h3>
                                        {isSignedIn && (
                                            <>
                                                <Favorite movie={movie.item} favorites={favorites} />
                                                <FolderList movie={movie.item} />
                                                {!released && (
                                                    <Release movie={movie.item} notifications={notifications} />
                                                )}
                                            </>
                                        )}
                                    </DivTitle2>
                                    <DivInfo3>
                                        {stringmethod(movie.item.release_date)}
                                        {movie.item.production_countries !== undefined &&
                                            `(${movie.item.production_countries.map(
                                                (item: any) => `${item.iso_3166_1},`,
                                            )})`}
                                        ・
                                        {movie.item.genres !== undefined &&
                                            movie.item.genres.map((item: any) => (
                                                <span
                                                    key={item.id}
                                                    style={{
                                                        paddingLeft: '5px',
                                                        margin: 0,
                                                        height: '24px',
                                                        lineHeight: '24px',
                                                    }}>
                                                    {item.name}
                                                </span>
                                            ))}
                                        <span>{movie.item.runtime}分</span>
                                    </DivInfo3>
                                </DivTitle>
                                <RatingStar voteAverage={movie.item.vote_average} voteCount={movie.item.vote_count} />
                                <DivDes>
                                    <h3>概要</h3>
                                    <p>{movie.item.overview}</p>
                                </DivDes>
                                <DivCompany>
                                    {movie.item.production_companies !== undefined &&
                                        movie.item.production_companies.map(
                                            (item: any, index: number) =>
                                                item.logo_path !== null && (
                                                    <img
                                                        key={index}
                                                        src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                                                    />
                                                ),
                                        )}
                                </DivCompany>
                            </DivInfo2>
                        </DivInfo>
                    </DivDetail>
                </DivWrapper>
            </Div>
            <DivSub>
                <DivCast>
                    <h2>主な出演者</h2>
                    <DivCast2>
                        {casts.items.slice(0, 20).map((cast: cast, index: number) => (
                            <Cast cast={cast} key={index} />
                        ))}
                    </DivCast2>
                </DivCast>
                {trailers.items.length !== 0 && (
                    <DivTrail>
                        <h3>動画</h3>
                        <DivTrail2>
                            {trailers.items.map((trailer: { key: number }, index: number) => (
                                <Trailer trailer={trailer} key={index} />
                            ))}
                        </DivTrail2>
                    </DivTrail>
                )}
                {movies.isFetching !== true && (
                    <DivSimiller>
                        {movies.items !== undefined && movies.items.length > 0 && (
                            <>
                                <h2>おすすめ</h2>
                                <DivSimiller2>
                                    {movies.items.slice(0, 10).map((movie: movie) => (
                                        <MovieCard movie={movie} key={movie.id} />
                                    ))}
                                </DivSimiller2>
                            </>
                        )}
                    </DivSimiller>
                )}
            </DivSub>
        </>
    )
}

export default MovieDetail

const Div: any = styled.div((props: Image) => ({
    backgroundImage: props.backdropImage,
    backgroundSize: 'cover',
    paddingTop: '60px',
}))

const DivWrapper = styled.div({
    backgroundImage:
        'linear-gradient(to right, rgba(5.88%, 27.45%, 27.06%, 0.6) 150px, rgba(10.59%, 36.47%, 36.08%, 0.84) 100%) !important',
})

const DivDetail = styled.div({
    display: 'flex',
    maxWidth: '1300px',
    padding: '40px',
    width: '100%',
    margin: '0 auto',
    color: 'white',
})

const DivImage = styled.div({
    width: '350px',
    minWidth: '350px',
    position: 'relative',
    img: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
    },
})

const DivInfo = styled.div({
    position: 'relative',
    alignContent: 'center',
    display: 'flex',
})

const DivInfo2 = styled.div({
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    paddingLeft: '40px',
})

const DivTitle = styled.div({
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
})

const DivTitle2 = styled.div({
    width: '100%',
    display: 'flex',
    h3: {
        fontWeight: 800,
        fontSize: '25px',
        height: '40px',
        lineHeight: '40px',
        span: {
            fontWeight: 300,
            fontSize: '25px',
            margin: '0 10px',
        },
    },
})

const DivInfo3 = styled.div({
    display: 'flex',
    span: {
        fontWeight: 500,
        fontSize: '16px',
        paddingLeft: '8px',
    },
})

const DivDes = styled.div({
    maxHeight: '180px',
    marginBottom: '30px',
    width: '85%',
    p: {
        padding: '20px',
        borderRadius: '10px',
        height: '130px',
        lineHeight: '30px',
        overflowY: 'scroll',
    },
})

const DivCompany = styled.div({
    display: 'flex',
    width: '100%',
    img: {
        width: '5%',
        height: '40px',
        margin: '30px',
    },
})

const DivSub = styled.div({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1300px',
    width: '80%',
    margin: '0 auto',
})

const DivCast = styled.div({
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px',
})

const DivCast2 = styled.div({
    borderTop: '2px solid lightgray',
    paddingTop: '15px',
    display: 'flex',
    height: '280px',
    overflowX: 'scroll',
    overflowY: 'hidden',
})

const DivTrail = styled.div({
    padding: '20px 40px',
})

const DivTrail2 = styled.div({
    borderTop: '2px solid lightgray',
    paddingTop: '15px',
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'hidden',
})

const DivSimiller = styled.div({
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px',
})

const DivSimiller2 = styled.div({
    borderTop: '2px solid lightgray',
    paddingTop: '15px',
    display: 'flex',
    height: '270px',
    overflowX: 'scroll',
    overflowY: 'hidden',
})
