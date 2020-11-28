import { db, FirebaseTimestamp } from '../../firebase/index'
import { fethcFolderMovieAction } from './actions'

const folderRef = db.collection('folder')
const usersRef = db.collection('user')

export const deleteFolderMovie = (folderId: string, movie: Movie) => {
  return async (dispatch: any) => {
    folderRef
      .doc(folderId)
      .collection('movie')
      .get()
      .then((snapshot) => {
        const match: any = []
        snapshot.docs.forEach((doc) => {
          const data = doc.data()
          if (data.id === movie.id) {
            match.push(data)
          }
        })
        if (match.length === 0) {
          return false
        } else {
          folderRef.doc(folderId).collection('movie').doc(match[0].movieId).delete()
        }
      })
  }
}

export const addFolderMovie = (folderId: string, movie: Movie) => {
  return async (dispatch: any) => {
    folderRef
      .doc(folderId)
      .collection('movie')
      .get()
      .then((snapshot) => {
        const match = []
        snapshot.docs.forEach((doc) => {
          const data = doc.data()
          if (data.id === movie.id) {
            match.push(data)
          }
        })
        if (match.length > 0) {
          return false
        } else {
          const ref = usersRef.doc(folderId).collection('movie').doc()
          const movieId = ref.id
          const data = {
            movieId: movieId,
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            release_date: movie.release_date,
            genres: movie.genres,
            overview: movie.overview,
            vote_average: movie.vote_average,
            timestamp: FirebaseTimestamp.now(),
          }
          folderRef.doc(folderId).collection('movie').doc(movieId).set(data)
        }
      })
  }
}

export const fetchFolderMovie = (folderId: string) => {
  return async (dispatch: any) => {
    folderRef
      .doc(folderId)
      .collection('movie')
      .get()
      .then((snapshots) => {
        const list: any = []
        snapshots.forEach((snapshot) => {
          const data = snapshot.data()
          list.push(data)
        })
        dispatch(fethcFolderMovieAction(list))
      })
  }
}
