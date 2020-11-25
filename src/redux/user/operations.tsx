import { db, auth, FirebaseTimestamp } from '../../firebase/index'
import { push } from 'connected-react-router'
import { signInAction, signOutAction, fetchFavoriteAction, fetchFolderAction, fetchNotificationAction } from './actions'

const usersRef = db.collection('user')
const folderRef = db.collection('folder')

interface movie {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    genres: { id: number; name: string }[]
    overview: string
    timestamp: string
    vote_average: number
}

export const deleteNotification = (id: number) => {
    return async (dispatch: any, getState: any) => {
        const uid = getState().user.uid
        usersRef
            .doc(uid)
            .collection('notification')
            .get()
            .then((snapshot) => {
                const match: any = []
                snapshot.docs.forEach((doc) => {
                    const data = doc.data()
                    if (data.id === id) {
                        match.push(data)
                    }
                })
                if (match.length === 0) {
                    return false
                } else {
                    usersRef.doc(uid).collection('notification').doc(match[0].movieId).delete()
                }
            })
    }
}

export const fetchNotification = () => {
    return async (dispatch: any, getState: any) => {
        const uid = getState().user.uid
        const today = new Date()
        usersRef
            .doc(uid)
            .collection('notification')
            .orderBy('release_date', 'asc')
            .onSnapshot((snapshots) => {
                const list: any = []
                snapshots.forEach((snapshot: any) => {
                    const data = snapshot.data()

                    list.push(data)
                })
                dispatch(fetchNotificationAction(list))
            })
    }
}

export const addNotification = (movie: movie) => {
    return async (dispatch: any, getState: any) => {
        const uid = getState().user.uid
        usersRef
            .doc(uid)
            .collection('notification')
            .get()
            .then((snapshots) => {
                const match: any = []
                snapshots.forEach((snapshot) => {
                    const data = snapshot.data()
                    if (data.id === movie.id) {
                        match.push(data)
                    }
                })
                if (match.length > 0) {
                    return false
                } else {
                    const ref = usersRef.doc(uid).collection('notification').doc()
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
                    usersRef.doc(uid).collection('notification').doc(movieId).set(data)
                }
            })
    }
}

export const fetchFolders = (uid: string) => {
    return async (dispatch: any) => {
        usersRef
            .doc(uid)
            .collection('folder')
            .orderBy('created_at', 'asc')
            .onSnapshot((snapshots) => {
                const list: any = []
                snapshots.forEach((snapshot: any) => {
                    const data = snapshot.data()
                    list.push(data)
                })
                dispatch(fetchFolderAction(list))
            })
    }
}

export const deleteFolder = (uid: string, folderId: string) => {
    return async (dispatch: any) => {
        folderRef.doc(folderId).delete()
        usersRef.doc(uid).collection('folder').doc(folderId).delete()
    }
}

export const makeFolder = (uid: string, folderName: string) => {
    return async (dispatch: any) => {
        const ref = folderRef.doc()
        const folderId = ref.id
        folderRef.doc(folderId).set({
            created_at: FirebaseTimestamp.now(),
            name: folderName,
            uid: uid,
        })
        usersRef.doc(uid).collection('folder').doc(folderId).set({
            name: folderName,
            id: folderId,
            created_at: FirebaseTimestamp.now(),
        })
    }
}

export const fetchFavoriteMovie = (uid: any) => {
    return async (dispatch: any) => {
        usersRef
            .doc(uid)
            .collection('favorite')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshots) => {
                const list: any = []
                snapshots.forEach((doc) => {
                    const data = doc.data()
                    list.push(data)
                })
                dispatch(fetchFavoriteAction(list))
            })
    }
}

export const deleteFavoriteMovie = (id: number) => {
    return async (dispatch: any, getState: any) => {
        const uid = getState().user.uid
        usersRef
            .doc(uid)
            .collection('favorite')
            .get()
            .then((snapshot) => {
                const match: any = []
                snapshot.docs.filter((doc) => {
                    const data = doc.data()
                    if (data.id === id) {
                        match.push(data)
                    }
                })
                if (match.length === 0) {
                    return false
                } else {
                    console.log(match)
                    usersRef.doc(uid).collection('favorite').doc(match[0].movieId).delete()
                }
            })
    }
}

export const addFavoriteMovie = (movie: movie) => {
    return async (dispatch: any, getState: any) => {
        const uid = getState().user.uid
        usersRef
            .doc(uid)
            .collection('favorite')
            .get()
            .then((snapshot) => {
                const match = snapshot.docs.filter((doc) => {
                    const data = doc.data()
                    return data.id === movie.id
                })
                if (match.length > 0) {
                    return false
                } else {
                    const ref = usersRef.doc(uid).collection('favorite').doc()
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
                    usersRef.doc(uid).collection('favorite').doc(movieId).set(data)
                }
            })
    }
}

export const signUp = (
    username: string,
    email: string,
    genres: Array<{ id: number; name: string }>,
    password: string,
    confirmPassword: string,
) => {
    return async (dispatch: any) => {
        if (username === '' || email === '' || password === '') {
            alert('必須項目が未入力です')
            return false
        }
        if (password !== confirmPassword) {
            alert('パスワードが一致しません')
            return false
        }
        return auth.createUserWithEmailAndPassword(email, password).then((result) => {
            const user = result.user
            if (user) {
                const uid = user.uid
                const timestamp = FirebaseTimestamp.now()
                const userData = {
                    uid: uid,
                    genres: genres,
                    email: email,
                    username: username,
                    created_at: timestamp,
                }
                usersRef
                    .doc(uid)
                    .set(userData)
                    .then(() => {
                        dispatch(push('/signin'))
                    })
                    .catch((error) => alert('通信環境を整えて再度試して下さい。'))
            }
        })
    }
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: any) => {
        if (email === '' || password === '') {
            alert('必須項目が未入力です')
            return false
        }
        auth.signInWithEmailAndPassword(email, password).then((result) => {
            const user = result.user
            if (user) {
                const uid = user.uid
                db.collection('user')
                    .doc(uid)
                    .get()
                    .then((snapshot) => {
                        const data: any = snapshot.data()
                        dispatch(
                            signInAction({
                                isSignedIn: true,
                                username: data.username,
                                uid: data.uid,
                                genres: data.genres,
                            }),
                        )
                        dispatch(push('/'))
                    })
            }
        })
    }
}

export const listenAuthState = () => {
    return async (dispatch: any) => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid
                usersRef
                    .doc(uid)
                    .get()
                    .then((snapshot) => {
                        const data = snapshot.data()
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません')
                        }
                        dispatch(
                            signInAction({
                                isSignedIn: true,
                                username: data.username,
                                uid: uid,
                                genres: data.genres,
                            }),
                        )
                    })
            }
        })
    }
}

export const signOut = () => {
    return async (dispatch: any) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const resetPassword = (email: string) => {
    return async (dispatch: any) => {
        if (email === '') {
            alert('必須項目が未入力です')
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレスにパスワードリセット用のメールを送信しました。')
                    dispatch(push('/signin'))
                })
                .catch(() => {
                    alert('メールの送信に失敗しました。通信環境を整えて再度試してください。')
                })
        }
    }
}
