import React from 'react'
import { URL_IMG } from '../../api'
import NoImage from '../../assets/images/no_image.png'
import { MovieCard2 } from '../../components'
import styled from 'styled-components'

type Props = {
  actor: ActorDetail
  movies: MovieList
  gender: (gender: number) => string
}
const Layout = ({ actor, movies, gender }: Props) => {
  return movies.isFetching || actor.isFetching ? (
    <ActorSectionTitle style={{ padding: '30px' }}>LOADING</ActorSectionTitle>
  ) : (
    <Wrapper>
      <WrapperSub>
        <ActorInfoWrapper>
          <ActorImage src={actor.item.profile_path ? URL_IMG + 'w342/' + actor.item.profile_path : NoImage} />
          <ActorInfoList>
            <ActorInfo>
              {actor.item.place_of_birth !== null && (
                <>
                  <ActorSubTitle>出生地</ActorSubTitle>
                  {actor.item.place_of_birth}
                </>
              )}
            </ActorInfo>
            <ActorInfo>
              <ActorSubTitle>性別</ActorSubTitle>
              {gender(actor.item.gender)}
            </ActorInfo>
            <ActorInfo>
              {actor.item.birthday !== null && (
                <>
                  <ActorSubTitle>誕生日</ActorSubTitle>
                  {actor.item.birthday}
                </>
              )}
            </ActorInfo>
          </ActorInfoList>
        </ActorInfoWrapper>
        <ActorDescription>
          <ActorTitle>
            {actor.item.name}
            {actor.item.gender !== 0 && <ActorGender>{actor.item.gender === 1 ? 'female' : 'male'}</ActorGender>}
          </ActorTitle>
          <ActorBiography>
            {actor.item.biography !== '' && (
              <>
                <ActorSectionTitle>経歴</ActorSectionTitle>
                <ActorBiography2>
                  <ActorBiographyDescription>{actor.item.biography}</ActorBiographyDescription>
                </ActorBiography2>
              </>
            )}
          </ActorBiography>
          <ActorMovies>
            <ActorSectionTitle>作品</ActorSectionTitle>
            <ActorMovies2>
              {movies.items.map((movie: Movie) => (
                <MovieCard2 movie={movie} key={movie.id} />
              ))}
            </ActorMovies2>
          </ActorMovies>
        </ActorDescription>
      </WrapperSub>
    </Wrapper>
  )
}

export default Layout

const ActorSectionTitle = styled.div({
  fontWeight: 600,
  fontSize: '18px',
})

const ActorSubTitle = styled.div({
  fontWeight: 550,
  fontSize: '14px',
})

const Wrapper = styled.div({
  paddingTop: '60px',
})

const WrapperSub = styled.div({
  display: 'flex',
  maxWidth: '1300px',
  padding: '40px',
  width: '100%',
  margin: '0 auto',
})

const ActorInfoWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const ActorImage = styled.img({
  width: '300px',
  borderRadius: '10px',
  height: '450px',
})

const ActorInfoList = styled.ul({
  marginTop: '15px',
  listStyle: 'none',
  padding: '40px',
})

const ActorInfo = styled.li({
  paddingBottom: '10px',
})

const ActorDescription = styled.div({
  position: 'relative',
  alignContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  paddingLeft: '40px',
  width: '70%',
})

const ActorTitle = styled.div({
  width: '100%',
  fontSize: '20px',
  fontWeight: 600,
  display: 'flex',
})

const ActorGender = styled.div({
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '23px',
  color: 'gray',
  paddingLeft: '20px',
  height: '33px',
  flexWrap: 'wrap',
})

const ActorBiography = styled.div({
  marginTop: '40px',
  width: '100%',
})

const ActorBiography2 = styled.div({
  padding: '20px',
  height: '200px',
  backgroundColor: 'white',
  overflowY: 'scroll',
  lineHeight: '1.4rem',
  flexWrap: 'wrap',
})

const ActorBiographyDescription = styled.div``

const ActorMovies = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
})

const ActorMovies2 = styled.div({
  borderTop: '2px solid lightgray',
  paddingTop: '15px',
  display: 'flex',
  height: '270px',
  overflowX: 'scroll',
  overflowY: 'hidden',
})
