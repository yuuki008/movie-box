export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION'
export const fetchNotificationAction = (notifications: Movie[]) => {
  return {
    type: 'FETCH_NOTIFICATION',
    moviePayload: notifications,
  }
}

export const FETCH_FOLDER = 'FETCH_FOLDER'
export const fetchFolderAction = (folders: Folder[]) => {
  return {
    type: 'FETCH_FOLDER',
    folderPayload: folders,
  }
}

export const FETCH_FAVORITE = 'FETCH_FAVORITE'
export const fetchFavoriteAction = (favorites: Movie[]) => {
  return {
    type: 'FETCH_FAVORITE',
    moviePayload: favorites,
  }
}

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (user: { isSignedIn: boolean; username: string; uid: string; genres: Genre[] }) => {
  return {
    type: 'SIGN_IN',
    data: {
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
    data: {
      isSignedIn: false,
      username: '',
      uid: '',
      genres: [],
      favorite: [],
    },
  }
}
