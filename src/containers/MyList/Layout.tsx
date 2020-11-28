import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { MovieCard, FolderMovie, TextInput } from '../../components'
import styled from 'styled-components'

type Props = {
  handleMakeFolder: () => void
  inputName: (value: string) => void
  background: string
  folders: Folder[]
  name: string
  favorites: Movie[]
}

export const Layout = (props: Props) => {
  const classes = useStyles()
  return (
    <Wrapper>
      <Wrapper2>
        <HeaderWrapper
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,032541,01b4e4)${props.background}`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
          <HeaderWrapper2>
            <Header>
              <HeaderTitle>自分だけのプレイリストを作ろう！</HeaderTitle>
              <MakeFolder>
                <TextInput
                  label="new playlist..."
                  fullWidth={true}
                  multiline={false}
                  required={false}
                  rows={1}
                  type={'text'}
                  onChange={props.inputName}
                  value={props.name}
                />
                <Button className={classes.add} onClick={() => props.handleMakeFolder()}>
                  作成
                </Button>
              </MakeFolder>
            </Header>
          </HeaderWrapper2>
        </HeaderWrapper>
        <LikesWrapper>
          <SectionTitle>お気に入り</SectionTitle>
          <Likes>
            {props.favorites.length > 0 && props.favorites.map((item: Movie) => <MovieCard movie={item} key={item.id} />)}
          </Likes>
        </LikesWrapper>
        {props.folders.map((folder: Folder) => (
          <LikesWrapper key={folder.id}>
            <FolderMovie folder={folder} />
          </LikesWrapper>
        ))}
      </Wrapper2>
    </Wrapper>
  )
}

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

const HeaderWrapper: any = styled.div``

const HeaderWrapper2 = styled.div({
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

const HeaderTitle = styled.div({
  paddingTop: '70px',
  paddingLeft: '70px',
  fontWeight: 700,
  fontSize: '27px',
  margin: '0 auto',
  color: 'white',
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

const SectionTitle = styled.div({
  paddingTop: '20px',
  fontWeight: 600,
  fontSize: '18px',
})

const Likes = styled.div({
  display: 'flex',
  overflowX: 'scroll',
  width: '100%',
})
