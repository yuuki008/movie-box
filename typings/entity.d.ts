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

type User = {
    isSignedIn: boolean
    username: string
    uid: string
    genres: Genre[]
}