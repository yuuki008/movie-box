interface movie {
    id: string
    title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    genres: { id: number; name: string }[]
    overview: string
    timestamp: string
    vote_average: number
}

interface folder {
    created_at: string
    id: string
    name: string
}

export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION'
export const fetchNotificationAction = (notifications: movie[]) => {
    return {
        type: 'FETCH_NOTIFICATION',
        payload: notifications,
    }
}

export const FETCH_FOLDER = 'FETCH_FOLDER'
export const fetchFolderAction = (folders: folder[]) => {
    return {
        type: 'FETCH_FOLDER',
        payload: folders,
    }
}

export const FETCH_FAVORITE = 'FETCH_FAVORITE'
export const fetchFavoriteAction = (favorites: movie[]) => {
    return {
        type: 'FETCH_FAVORITE',
        payload: favorites,
    }
}

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (user: {
    isSignedIn: boolean
    username: string
    uid: string
    genres: Array<{ id: number; name: string }>
}) => {
    return {
        type: 'SIGN_IN',
        payload: {
            isSignedIn: true,
            username: user.username,
            uid: user.uid,
            genres: user.genres,
        },
    }
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = () => {
    return {
        type: 'SIGN_OUT',
        palyload: {
            isSignedIn: false,
            username: '',
            uid: '',
            genres: [],
            favorite: [],
        },
    }
}
