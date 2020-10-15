import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActorDetail, getMovieList } from '../redux/selectors'
import {fetchActorDetail} from '../redux/actor/operations';
import { fetchActorMovieList } from '../redux/movielist/operations';
import {URL_IMG} from '../api';
import NoImage from '../assets/images/no_image.png';
import '../assets/actor.css'
import {MovieCard2} from '../components'

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

const Actor = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const actor = getActorDetail(selector)
    const movies = getMovieList(selector)
    const id = window.location.pathname.split('/actor/')[1]

    const gender = (gender: number) => {
        if(gender === 1){
            return '女性'
        }else if(gender === 2){
            return  '男性'
        }else{
            return '不明'
        }
    }

    useEffect(() => {
        if(id){
            dispatch(fetchActorDetail(id))
            dispatch(fetchActorMovieList(id))
        }
    },[])

    return (
        movies.isFetching || actor.isFetching ? (
            <h3 style={{padding: "30px"}}>LOADING</h3>
        ):(
            <div className="actor">
            <div className="actor__detail">
                <div className="actor__poster">
                    <img
                    src={actor.item.profile_path ? (URL_IMG +"w342/" + actor.item.profile_path):(NoImage)}
                    />
                    <ul className="actor_meta">
                        <li>
                            {actor.item.place_of_birth !== null &&
                            <>
                                <h4>出生地</h4>
                                {actor.item.place_of_birth}
                            </>
                            }
                        </li>
                        <li>
                            <h4>性別</h4>
                            {gender(actor.item.gender)}
                        </li>
                        <li>
                            {actor.item.birthday !== null && (
                                <>
                                <h4>誕生日</h4>
                                {actor.item.birthday}
                                </>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="actor__info">
                    <h3>{actor.item.name}
                        {actor.item.gender !== 0 && (
                            <span>{actor.item.gender === 1 ? "female" : "male"}</span>
                        )}
                    </h3>
                    <div className="actor__description">
                        {actor.item.biography !== "" && (
                            <>
                            <h3>経歴</h3>
                            <div className="actor__carrer">
                                <p>{actor.item.biography}</p>
                            </div>
                            </>
                        )}
                    </div>
                    <div className="actor__movies">
                        <h3>作品</h3>
                        <div className="actor__movielist">
                            {movies.items.map((movie:movie) => 
                            <MovieCard2 movie={movie} key={movie.id}/>
                            )}
                        </div>
                    </div>
                </div> 
            </div>
            </div>         
        )
    )
}

export default Actor
