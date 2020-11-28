type Genre = {
  id: number
  name: string
}

type Movie = {
  id: number
  movieId: string
  title: string
  poster_path: string
  release_date: string
  genres: Genre[]
  overview: string
  timestamp: string
  vote_average: number
  name: string
  title: string
  backdrop_path: string
  vote_count: number
  first_air_date: string
}

type Cast = {
  name: string
  content: string
  id: number
  profile_path: string
  character: string
}

type Folder = {
  created_at: number
  name: string
  uid: string
  id: string
  list: Movie[]
}

type Company = {
  logo_path: string
  name: string
}

type Country = {
  name: string
  iso_3166_1: string
}

type Actor = {
  biography: string
  birthday: string
  gender: number
  name: string
  profile_path: string
  place_of_birth: string
  id: number
  popularity: number
  known_for_department: string
}

type Trailer = {
  key: string
}

type DefaultRootState = {
  movielist: MovieList
  user: User
  router: any
  castlist: CastList
  trailerlist: TrailerList
  moviedetail: MovieDetail
  actordetail: ActorDetail
  folder: Folder
}

type User = {
  username: string
  uid: string
  isSignedIn: boolean
  genres: Genre[]
  favorite?: []
  notifications?: []
  folder?: []
}

type MovieList = {
  isFetching: boolean
  items: Movie[]
  page: number
  total_pages: number
  error: any
}

type ActorDetail = {
  isFetching: boolean
  item: Actor
  error: any
}

type CastList = {
  isFetching: boolean
  items: Cast[]
  error: any
  page: number
  total_pages: number
}

type TrailerList = {
  isFetching: boolean
  items: Trailer[]
  error: any
  page: number
  total_pages: number
}

type MovieDetail = {
  isFetching: boolean
  item: Movie
  error: any
}
