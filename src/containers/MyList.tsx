import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorite, getFolders, getUid } from '../redux/selectors'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { fetchFavoriteMovie, fetchFolders, makeFolder } from '../redux/user/operations'
import { MovieCard, FolderMovie, TextInput } from '../components'
import styled from 'styled-components'

const MyList = () => {
    const classes = useStyles()
    const selector = useSelector((state) => state)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [background, setBackground] = useState('/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg')

    const uid = getUid(selector)
    const favorites = getFavorite(selector)
    const folders = getFolders(selector)

    const inputName = useCallback(
        (event) => {
            setName(event.target.value)
        },
        [setName],
    )

    const handleMakeFolder = () => {
        if (name !== '') {
            dispatch(makeFolder(uid, name))
            setName('')
            dispatch(fetchFolders(uid))
        }
    }

    useEffect(() => {
        if (uid) {
            dispatch(fetchFavoriteMovie(uid))
            dispatch(fetchFolders(uid))
        }
    }, [uid])

    useEffect(() => {
        if (favorites.length) {
            setBackground(favorites[Math.floor(Math.random() * favorites.length)].backdrop_path)
        }
    }, [favorites])

    return (
        <Wrapper>
            <Wrapper2>
                <div
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,032541,01b4e4)${background}`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <HeaderWrapper>
                        <Header>
                            <h3>自分だけのプレイリストを作ろう！</h3>
                            <MakeFolder>
                                <TextInput
                                    label="new playlist..."
                                    fullWidth={true}
                                    multiline={false}
                                    required={false}
                                    rows={1}
                                    type={'text'}
                                    onChange={inputName}
                                    value={name}
                                />
                                <Button className={classes.add} onClick={() => handleMakeFolder()}>
                                    作成
                                </Button>
                            </MakeFolder>
                        </Header>
                    </HeaderWrapper>
                </div>
                <LikesWrapper>
                    <h2>お気に入り</h2>
                    <Likes>
                        {favorites.length > 0 &&
                            favorites.map((item: Movie) => <MovieCard movie={item} key={item.id} />)}
                    </Likes>
                </LikesWrapper>
                {folders.map((folder: Folder) => (
                    <LikesWrapper key={folder.id}>
                        <FolderMovie folder={folder} />
                    </LikesWrapper>
                ))}
            </Wrapper2>
        </Wrapper>
    )
}

export default MyList

const useStyles = makeStyles({
    icon: {
        height: '70px',
        width: '70px',
    },
    add: {
        color: 'white',
        width: '60px',
        backgroundColor: ' rgb(3,37,65)',
        borderTopRightRadius: '30px',
        borderBottomRightRadius: '30px',
    },
})

const Wrapper = styled.div({
    maxWidth: '1100px',
    width: '70%',
    margin: '0 auto',
    display: 'flex',
    position: 'relative',
    marginTop: '60px',
})

const Wrapper2 = styled.div({
    width: '100%',
})

// const DivImage: any = styled.div((props: { background: string }) => ({
//     backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,032541,01b4e4)${props.background}`,
//     backgroundPosition: 'center center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
// }))

const HeaderWrapper = styled.div({
    background: 'linear-gradient(to right, rgba(var(--tmdbDarkBlue), 0.8) 0%, rgba(var(--tmdbDarkBlue), 0) 100%)',
    width: '100%',
    height: '300px',
})

const Header = styled.div({
    position: 'relative',
    h3: {
        paddingTop: '70px',
        paddingLeft: '70px',
        fontWeight: 700,
        fontSize: '27px',
        margin: '0 auto',
        color: 'white',
    },
})

const MakeFolder = styled.div({
    display: 'flex',
    backgroundColor: 'white',
    width: '70%',
    margin: '30px auto',
    borderRadius: '30px',
    paddingLeft: '20px',
    height: '55px',
})

const LikesWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    h2: {
        paddingTop: '20px',
    },
})

const Likes = styled.div({
    display: 'flex',
    overflowX: 'scroll',
    width: '100%',
})
