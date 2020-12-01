import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks/useRedux'
import { db } from '../../../firebase/index'
import { deleteFolder, fetchFolders } from '../../../redux/user/operations'
import { getUid } from '../../../redux/selectors'

type Params = {
  folder: Folder
}
export const useProps = (params: Params) => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()

  const uid = getUid(selector)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    if (params.folder.id) {
      db.collection('folder')
        .doc(params.folder.id)
        .collection('movie')
        .get()
        .then((snapshot: any) => setMovies(snapshot.docs.map((doc: any) => doc.data())))
    }
  }, [params.folder.id])

  return {
    movies: movies,
    handleDelete() {
      const ref = window.confirm('このフォルダを削除しますか？')
      if (ref) {
        dispatch(deleteFolder(uid, params.folder.id))
        dispatch(fetchFolders(uid))
      }
    },
    folder: params.folder,
  }
}
