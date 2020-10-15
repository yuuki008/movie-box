import React, {useEffect, useRef, useState, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCastList } from '../redux/castlist/operations'
import { fetchMovieDetail } from '../redux/movie/operations'
import { fetchTrailerList } from '../redux/trailerlist/operations'
import { getCastList, getFavorite, getIsSignedIn, getMovieDetail, getMovieList, getNotifications, getTrailerList, getUid } from '../redux/selectors'
import { IMG_SIZE_LARGE, URL_IMG } from '../api'
import '../assets/movieDetail.css';
import NoImage from '../assets/images/no_image.png';
import { fetchSimilarMovies } from '../redux/movielist/operations'
import { makeStyles } from '@material-ui/styles'
import { fetchFavoriteMovie, fetchNotification} from '../redux/user/operations'
import {MovieCard, RatingStar, Cast, Trailer, FolderList,Favorite, Release} from '../components'

const useStyles = makeStyles({
    iconButton:{
        position: 'absolute',
        top: 40,
        right: "3%",
    },
    color:{
        color: 'red',
    },
})

interface movie{
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: {id: number; name: string}[];
    overview: string;
    timestamp: string;
    vote_average: number;
}


interface cast{
    name: string;
    content: string;
    id: number;
    profile_path: string;
    character: string;
  }

const MovieDetail = () => {
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    const classes = useStyles()
    
    const movie = getMovieDetail(selector)
    const casts = getCastList(selector)
    const trailers = getTrailerList(selector)
    const movies = getMovieList(selector)
    const isSignedIn = getIsSignedIn(selector)
    const favorites = getFavorite(selector)
    const uid = getUid(selector)
    const notifications = getNotifications(selector)
    
    const id = window.location.pathname.split('/movie/')[1]
    
    const [released, setReleased] = useState(false);
    
  

    const backdropImage = `url(https://image.tmdb.org/t/p/original${movie.item.backdrop_path})`;
    let year;
    if(typeof(movie.item.release_date) === 'string'){
        year = (movie.item.release_date.split('-')[0])
    }

    const stringmethod = (str: string) => {
        if(str !== undefined){
            const date = (str.substr(0, 4) + '年' + str.substr(5, 2) + '月' + str.substr(8, 2) + '日')
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
        if(id && prevId !== id){
            dispatch(fetchMovieDetail(id))
            dispatch(fetchCastList(id))
            dispatch(fetchTrailerList(id))
        }
    },[id])

    useEffect(() => {
        if(uid !== "" && isSignedIn){
            dispatch(fetchFavoriteMovie(uid))
            dispatch(fetchNotification())
        }
    },[uid])

    useEffect(() => {
        if(movie.item.release_date !== undefined){
            const release = movie.item.release_date.split('-')
            const year = release[0]
            const month = release[1]
            const date = release[2]
            const releaseDate = `${year}/${month}/${date} 00:00:00`
            let today:any = new Date()
            const data:any = Date.parse(releaseDate)
            if(data < today){
                setReleased(true)
            }else{
                setReleased(false)
            }
        }
        if(movie.item !== {}){
            dispatch(fetchSimilarMovies(movie.item.id))      
        }
    },[movie])


    return (
        movie.isFetching || casts.isFetching || trailers.isFetching  ? (
            <h2 style={{padding: "40px"}}>LOADING</h2>
        ):(
            <>
            <div
                style={{
                    backgroundImage: backdropImage,
                    backgroundSize: 'cover',
                    paddingTop: '60px',
                }}
            >
                <div className="movie__main">
                    <div className="movie__detail">

                        <div className="movie__poster">
                            <img 
                            src={movie.item.poster_path !== null ? (URL_IMG+IMG_SIZE_LARGE+movie.item.poster_path):(NoImage)}/>
                        </div>
                        <div className="movie__info">
                            <div className="movie__info__wrapper">
                                <div className="movie__title">
                                    <div className="movie__info__title">
                                        <h3>{movie.item.title}<span>({year})</span></h3>
                                        {isSignedIn && (
                                            <>
                                            <Favorite movie={movie.item} favorites={favorites}/>
                                            <FolderList movie={movie.item}/>
                                            {!released && (
                                                <Release movie={movie.item} notifications={notifications}/>
                                            )}
                                            </>                                            
                                        )}
                                    </div>
                                    <div className="movie__information">
                                        {stringmethod(movie.item.release_date)}
                                        {movie.item.production_countries !== undefined && (
                                            `(${movie.item.production_countries.map((item:any) => 
                                            `${item.iso_3166_1},`
                                            )})`
                                        )}  
                                        ・{movie.item.genres !== undefined && (
                                            movie.item.genres.map((item:any) => 
                                                <span key={item.id} style={{paddingLeft: "5px", margin: 0, height: '24px', lineHeight: "24px"}}>{item.name}</span>
                                            ) 
                                        )}
                                        <span>
                                            {movie.item.runtime}分
                                        </span>
                                    </div>
                                </div>
                                <RatingStar voteAverage={movie.item.vote_average} voteCount={movie.item.vote_count}/>
                                <div className="movie__info__description">
                                    <h3>概要</h3>
                                    <p>{movie.item.overview}</p>
                                </div>
                                <div className="movie__company">
                                    {movie.item.production_companies !== undefined && (
                                        movie.item.production_companies.map((item:any, index:number) =>
                                        item.logo_path !== null && (
                                            <img key={index} src={`https://image.tmdb.org/t/p/original${item.logo_path}`}/>
                                        ) 
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie__subinfo">
                <div className="movie__cast">
                    <h2>主な出演者</h2>  
                        <div className="movie__casts">
                            {casts.items.slice(0, 20).map((cast: cast, index: number) => 
                            <Cast cast={cast} key={index} />
                            )}
                        </div>
                </div>
                {trailers.items.length !== 0 && (
                    <div className="movie__trailers">
                        <h3>動画</h3>
                        <div className="movie__trailerlist">
                            {trailers.items.map((trailer: {key: number}, index:number) => 
                            <Trailer trailer={trailer} key={index} />
                            )}   
                        </div>
                    </div>
                )}
                {movies.isFetching !== true && (
                    <div className="movie__similler">
                        {movies.items !== undefined && (
                            movies.items.length > 0 && (
                            <>
                            <h2>おすすめ</h2>
                                <div className="movie__simillers">
                                {movies.items.slice(0, 10).map((movie: movie) => 
                                    <MovieCard movie={movie} key={movie.id}/>
                                )}
                                </div>                 
                            </>
                            )
                        )}
                    </div>
                )}
            </div>
            </>
        )
    )
}

export default MovieDetail
