import React from 'react'
import NoImage from '../../assets/images/no_image.png'
import styled from 'styled-components'
import { MovieCard, RatingStar, Cast, Trailer, FolderList, Favorite, Release } from '../../components'
import { IMG_SIZE_LARGE, URL_IMG } from '../../api'

type Props = {
  movie: MovieDetail
  casts: CastList
  trailers: TrailerList
  isSignedIn: boolean
  year: number
  released: boolean
  stringmethod: (str: string) => string | undefined
  backdropImage: string
  notifications: Movie[]
  movies: MovieList
  favorites: Movie[]
}

export const Layout = (props: Props) => {
  return props.movie.isFetching || props.casts.isFetching || props.trailers.isFetching ? (
    <MovieSectionTitle>LOADING</MovieSectionTitle>
  ) : (
    <>
      <MovieWrapper backdropImage={props.backdropImage}>
        <MovieWrapper2>
          <MovieDescription>
            <MovieImage>
              <img
                src={
                  props.movie.item.poster_path !== null
                    ? URL_IMG + IMG_SIZE_LARGE + props.movie.item.poster_path
                    : NoImage
                }
              />
            </MovieImage>
            <MovieInfoWrapper>
              <MovieInfoLabel>
                <MovieTitleWrapper>
                  <MovieTitleWrapper2>
                    <MovieTitle>
                      {props.movie.item.title}
                      <MovieTitleYear>({props.year})</MovieTitleYear>
                    </MovieTitle>
                    {props.isSignedIn && (
                      <>
                        <Favorite movie={props.movie.item} favorites={props.favorites} />
                        <FolderList movie={props.movie.item} />
                        {!props.released && <Release movie={props.movie.item} notifications={props.notifications} />}
                      </>
                    )}
                  </MovieTitleWrapper2>
                  <MovieInfo>
                    {props.stringmethod(props.movie.item.release_date)}
                    {props.movie.item.production_countries !== undefined &&
                      `(${props.movie.item.production_countries.map((item: Country) => `${item.iso_3166_1},`)})`}
                    ・
                    {props.movie.item.genres !== undefined &&
                      props.movie.item.genres.map((item: Genre) => (
                        <MovieSectionSpan
                          key={item.id}
                          style={{
                            paddingLeft: '5px',
                            margin: 0,
                            height: '24px',
                            lineHeight: '24px',
                          }}>
                          {item.name}
                        </MovieSectionSpan>
                      ))}
                    <MovieRunTime>{props.movie.item.runtime}分</MovieRunTime>
                  </MovieInfo>
                </MovieTitleWrapper>
                <RatingStar voteAverage={props.movie.item.vote_average} voteCount={props.movie.item.vote_count} />
                <MovieOverviewWrapper>
                  <MovieSectionTitle>概要</MovieSectionTitle>
                  <MovieOverview>{props.movie.item.overview}</MovieOverview>
                </MovieOverviewWrapper>
                <MovieCompany>
                  {!!props.movie.item.production_companies &&
                    props.movie.item.production_companies.map(
                      (item: Company, index: number) =>
                        item.logo_path !== null && (
                          <MovieCompanyImg key={index} src={`https://image.tmdb.org/t/p/original${item.logo_path}`} />
                        ),
                    )}
                </MovieCompany>
              </MovieInfoLabel>
            </MovieInfoWrapper>
          </MovieDescription>
        </MovieWrapper2>
      </MovieWrapper>
      <MovieSubWrapper>
        <MovieCastWrapper>
          <MovieSectionTitle>主な出演者</MovieSectionTitle>
          <MovieCastWrapper2>
            {props.casts.items.slice(0, 20).map((cast: Cast, index: number) => (
              <Cast cast={cast} key={index} />
            ))}
          </MovieCastWrapper2>
        </MovieCastWrapper>
        {props.trailers.items.length !== 0 && (
          <MovieTrailWrapper>
            <MovieSectionTitle>動画</MovieSectionTitle>
            <MovieTrailWrapper2>
              {props.trailers.items.map((trailer: { key: number }, index: number) => (
                <Trailer trailer={trailer} key={index} />
              ))}
            </MovieTrailWrapper2>
          </MovieTrailWrapper>
        )}
        {props.movies.isFetching !== true && (
          <MovieSimilarWrapper>
            {props.movies.items !== undefined && props.movies.items.length > 0 && (
              <>
                <MovieSectionTitle>おすすめ</MovieSectionTitle>
                <MovieSimilarWrapper2>
                  {props.movies.items.slice(0, 10).map((movie: Movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
                </MovieSimilarWrapper2>
              </>
            )}
          </MovieSimilarWrapper>
        )}
      </MovieSubWrapper>
    </>
  )
}

const MovieWrapper = styled.div((props: { backdropImage: string }) => ({
  backgroundImage: props.backdropImage,
  backgroundSize: 'cover',
  paddingTop: '60px',
}))

const MovieWrapper2 = styled.div({
  backgroundImage:
    'linear-gradient(to right, rgba(5.88%, 27.45%, 27.06%, 0.6) 150px, rgba(10.59%, 36.47%, 36.08%, 0.84) 100%) !important',
})

const MovieDescription = styled.div({
  display: 'flex',
  maxWidth: '1300px',
  padding: '40px',
  width: '100%',
  margin: '0 auto',
  color: 'white',
})

const MovieImage = styled.div({
  width: '350px',
  minWidth: '350px',
  position: 'relative',
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
})

const MovieInfoWrapper = styled.div({
  position: 'relative',
  alignContent: 'center',
  display: 'flex',
})

const MovieInfoLabel = styled.div({
  alignContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  paddingLeft: '40px',
})

const MovieTitleWrapper = styled.div({
  marginBottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  width: '100%',
})

const MovieTitleWrapper2 = styled.div({
  width: '100%',
  display: 'flex',
})

const MovieTitle = styled.div({
  fontWeight: 800,
  display: 'flex',
  fontSize: '25px',
  lineHeight: '40px',
  height: '40px',
})

const MovieTitleYear = styled.div({
  fontWeight: 300,
  fontSize: '25px',
  margin: '0 10px',
})

const MovieInfo = styled.div({
  display: 'flex',
  span: {
    fontWeight: 500,
    fontSize: '16px',
    paddingLeft: '8px',
  },
})

const MovieSectionSpan = styled.div({
  paddingLeft: '5px',
  margin: 0,
  height: '24px',
  lineHeight: '24px',
})

const MovieRunTime = styled.div({
  paddingLeft: '10px',
})

const MovieOverviewWrapper = styled.div({
  maxHeight: '180px',
  marginBottom: '30px',
  width: '85%',
})

const MovieOverview = styled.div({
  padding: '20px',
  borderRadius: '10px',
  height: '130px',
  lineHeight: '30px',
  overviewY: 'scroll',
})

const MovieCompany = styled.div({
  display: 'flex',
  width: '100%',
  img: {
    width: '5%',
    height: '40px',
    margin: '30px',
  },
})

const MovieSubWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1300px',
  width: '80%',
  margin: '0 auto',
})

const MovieCastWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 40px',
})

const MovieSectionTitle = styled.div({
  fontSize: '20px',
  fontWeight: 600,
})

const MovieCompanyImg = styled.img``

const MovieCastWrapper2 = styled.div({
  borderTop: '2px solid lightgray',
  paddingTop: '15px',
  display: 'flex',
  height: '280px',
  overflowX: 'scroll',
  overflowY: 'hidden',
})

const MovieTrailWrapper = styled.div({
  padding: '20px 40px',
})

const MovieTrailWrapper2 = styled.div({
  borderTop: '2px solid lightgray',
  paddingTop: '15px',
  display: 'flex',
  overflowX: 'scroll',
  overflowY: 'hidden',
})

const MovieSimilarWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 40px',
})

const MovieSimilarWrapper2 = styled.div({
  borderTop: '2px solid lightgray',
  paddingTop: '15px',
  display: 'flex',
  height: '270px',
  overflowX: 'scroll',
  overflowY: 'hidden',
})
