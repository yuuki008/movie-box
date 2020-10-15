import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getFavorite, getFolders, getUid} from '../redux/selectors';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles'
import { Button } from '@material-ui/core';
import '../assets/profile.css';
import { fetchFavoriteMovie, fetchFolders, makeFolder } from '../redux/user/operations';
import { MovieCard, FolderMovie, TextInput } from '../components';

const useStyles = makeStyles({
    icon: {
        height: '70px',
        width: '70px',
    },
    add:{
        color: 'white',
        width: '60px',
        backgroundColor: ' rgb(3,37,65)',
        borderTopRightRadius: '30px',
        borderBottomRightRadius: '30px',
    },
})

const MyList = () => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [background, setBackground] = useState('/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg')

    const uid = getUid(selector)
    const favorites = getFavorite(selector)
    const folders = getFolders(selector)

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName])

    const handleMakeFolder = () => {
        if(name !== ""){
            dispatch(makeFolder(uid, name))
            setName("")
            dispatch(fetchFolders(uid))
        }
    }

    useEffect(() => {
        if(uid){
            dispatch(fetchFavoriteMovie(uid))
            dispatch(fetchFolders(uid))
        }
    },[uid])

    useEffect(() => {
        if(favorites.length){
            setBackground(favorites[Math.floor(Math.random() * favorites.length)].backdrop_path)
        }
    },[favorites])


    return (
        <div className="mylist">
            <div className="mylist__list">
            <div
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,032541,01b4e4)${background}`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="mylist__header">
                    <div className="mylist__header__content">
                        <h3>自分だけのプレイリストを作ろう！</h3>
                        <div className="mylist__make">
                            <TextInput label="new playlist..." fullWidth={true} multiline={false} required={false} rows={1} type={'text'} onChange={inputName} value={name}/>
                            <Button
                                className={classes.add}
                                onClick={() => handleMakeFolder()}
                            >作成</Button>
                        </div>
                        <p></p>
                    </div>
                </div>
            </div>
                <div className="mylist__favorite">
                        <h2>お気に入り</h2>
                    <div className="mylist__favorite__list">
                        {favorites.length > 0 &&(
                            favorites.map((item:any) => 
                                <MovieCard movie={item} key={item.id}/>
                            )
                        )}
                    </div>
                </div>
                {folders.map((folder:any) => 
                    <div className="mylist__favorite" key={folder.id}>
                        <FolderMovie folder={folder}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyList
