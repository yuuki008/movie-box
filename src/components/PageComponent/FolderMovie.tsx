import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFolderMovies } from '../../redux/selectors'
import {fetchFolderMovie} from '../../redux/folder/operations'
import styled from 'styled-components'
import {LightTooltip} from '../UIkit'
import {db} from '../../firebase/index';
import MovieCard from '../Card/MovieCard'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/styles';
import {deleteFolder, fetchFolders} from '../../redux/user/operations'
import {getUid} from '../../redux/selectors';

const useStyles = makeStyles({
    icon: {
        width: '40px',
        height: '40px',
        position: 'absolute',
        bottom: 12,
    }
})

const Div = styled.div({
    width: '100%',
    borderRadius: '10px',
})

const H3 = styled.h3({
    textAlign: 'center',
    height: '80px',
    lineHeight: '80px',
    color: 'black',
    fontSize: '24px',
})

interface Props {
    folder: {id: string; name: string}
}
const FolderMovie: React.FC<Props> = ({folder}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const selector = useSelector(state => state)

    const uid = getUid(selector)

    const [movies, setMovies] = useState([])

    const handleDelete = () => {
        const ref = window.confirm('このフォルダを削除しますか?')
        if(ref){
            dispatch(deleteFolder(uid, folder.id))
            dispatch(fetchFolders(uid))
        }
    }

    useEffect(() => {
        if(folder.id){
            db.collection('folder').doc(folder.id).collection('movie').get()
            .then((snapshot:any) => 
                setMovies(snapshot.docs.map((doc:any) => doc.data()))
            )
        }
    },[folder.id])

    return (
        <>
        {movies.length === 0 ? (
            <div style={{height: '40px', position: 'relative', display: 'flex'}}>
                <LightTooltip title="作品がまだありません" placement="left">
                    <h3 style={{height: '40px', lineHeight: '40px'}}>{folder.name}</h3>
                </LightTooltip>
                <IconButton
                    onClick={() => handleDelete()}
                >
                    <LightTooltip title={`${folder.name}を削除`}>
                        <DeleteIcon/>
                    </LightTooltip>
                </IconButton>
            </div>
        ):(
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '100%', display: 'flex', position: 'relative'}}>
                <h2 style={{padding: '10px'}}>{folder.name}</h2>
                <div style={{height: '60px', position: 'relative'}}>
                    <IconButton className={classes.icon}
                        onClick={() => handleDelete()}
                    >
                        <LightTooltip title={`${folder.name}を削除`}>
                            <DeleteIcon/>
                        </LightTooltip>
                    </IconButton>
                </div>
            </div>
            <div style={{display: 'flex', overflowX: 'scroll',width: '100%'}}>
                {movies.map((movie:any) => 
                     <MovieCard movie={movie} key={movie.id} />
                )}
            </div>
            </div>
        )}
        </>
    )
}

export default FolderMovie
