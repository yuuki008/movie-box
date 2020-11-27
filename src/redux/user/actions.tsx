export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION'
export const fetchNotificationAction = (notifications: Movie[]) => {
    return {
        type: 'FETCH_NOTIFICATION',
        payload: notifications,
    }
}

export const FETCH_FOLDER = 'FETCH_FOLDER'
export const fetchFolderAction = (folders: Folder[]) => {
    return {
        type: 'FETCH_FOLDER',
        payload: folders,
    }
}

export const FETCH_FAVORITE = 'FETCH_FAVORITE'
export const fetchFavoriteAction = (favorites: Movie[]) => {
    return {
        type: 'FETCH_FAVORITE',
        payload: favorites,
    }
}

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (user: User) => {
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
