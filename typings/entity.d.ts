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
  production_countries: Country[]
  runtime: number
  production_companies: Company[]
}

type Cast = {
  name: string
  content: string
  id: number
  profile_path: string
  character: string
}

type Folder = {
  created_at: any
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
  key: number
}

type User = {
  username: string
  uid: string
  isSignedIn: boolean
  genres: Genre[]
  favorite: Movie[]
  notifications: Movie[]
  folder: Folder[]
}

type MovieList = {
  isFetching: boolean
  items: Movie[]
  page: number
  total_pages: number
  error: Error
}

type ActorDetail = {
  isFetching: boolean
  item: Actor
  error: Error
}

type CastList = {
  isFetching: boolean
  items: Cast[]
  error: Error
  page: number
  total_pages: number
}

type TrailerList = {
  isFetching: boolean
  items: Trailer[]
  error: Error
  page: number
  total_pages: number
}

type MovieDetail = {
  isFetching: boolean
  item: Movie
  error: any
}

type StoreState = {
  user: User
  folder: Folder[]
  moviedetail: Item
  actordetail: Item
  movielist: List
  trailerlist: List
  castlist: List
}

type List = {
  isFetching: boolean
  items: any[]
  page: number
  total_pages: number
  error: Error<unknown>
}

type Item = {
  isFetching: boolean
  item: {}
  error: Error<unkonwn>
}

type Initial = {
  user: User
  list: List
  item: Item
  folder: Folder[]
}
