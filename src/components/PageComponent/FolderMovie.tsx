import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LightTooltip } from '../UIkit'
import { db } from '../../firebase/index'
import MovieCard from '../Card/MovieCard'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import { deleteFolder, fetchFolders } from '../../redux/user/operations'
import { getUid } from '../../redux/selectors'
import styled from 'styled-components'

type Props = {
  folder: Folder
}
const FolderMovie: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const selector = useSelector((state) => state)

  const uid = getUid(selector)

  const [movies, setMovies] = useState([])

  const handleDelete = () => {
    const ref = window.confirm('このフォルダを削除しますか?')
    if (ref) {
      dispatch(deleteFolder(uid, props.folder.id))
      dispatch(fetchFolders(uid))
    }
  }

  useEffect(() => {
    if (props.folder.id) {
      db.collection('folder')
        .doc(props.folder.id)
        .collection('movie')
        .get()
        .then((snapshot: any) => setMovies(snapshot.docs.map((doc: any) => doc.data())))
    }
  }, [props.folder.id])

  return (
    <>
      {movies.length === 0 ? (
        <NonWrapper>
          <LightTooltip title="作品がまだありません" placement="left">
            <SectionTitle style={{ height: '40px', lineHeight: '40px' }}>{props.folder.name}</SectionTitle>
          </LightTooltip>
          <IconButton onClick={() => handleDelete()}>
            <LightTooltip title={`${props.folder.name}を削除`}>
              <DeleteIcon />
            </LightTooltip>
          </IconButton>
        </NonWrapper>
      ) : (
        <Wrapper>
          <TitleWrapper>
            <SectionTitle>{props.folder.name}</SectionTitle>
            <TitleWrapper2>
              <IconButton className={classes.icon} onClick={() => handleDelete()}>
                <LightTooltip title={`${props.folder.name}を削除`}>
                  <DeleteIcon />
                </LightTooltip>
              </IconButton>
            </TitleWrapper2>
          </TitleWrapper>
          <MovieWrapper>
            {movies.map((movie: any) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </MovieWrapper>
        </Wrapper>
      )}
    </>
  )
}

export default FolderMovie

const SectionTitle = styled.div({
  fontWeight: 600,
  fontSize: '18px',
  padding: '10px',
})

const NonWrapper = styled.div({
  height: '40px',
  position: 'relative',
  display: 'flex',
})

const Wrapper = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const TitleWrapper = styled.div({
  width: '100%',
  display: 'flex',
  position: 'relative',
})

const TitleWrapper2 = styled.div({
  height: '60px',
  position: 'relative',
})
const MovieWrapper = styled.div({
  display: 'flex',
  overflowY: 'scroll',
  width: '100%',
})

const useStyles = makeStyles({
  icon: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    bottom: 12,
  },
})
