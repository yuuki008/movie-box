import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db } from '../../../firebase/index'
import { deleteFolder, fetchFolders } from '../../../redux/user/operations'
import { getUid } from '../../../redux/selectors'

type Props = {
  folder: Folder
}
export const useProps = (props: Props) => {
  const selector = useSelector((state) => state)
  const dispatch = useDispatch()
  const uid = getUid(selector)

  const [movies, setMovies] = useState([])

  const handleDelete = () => {
    const ref = window.confirm('このフォルダを削除しますか?')
    if (ref) {
      dispatch(deleteFolder(uid, props.folder.id))
      dispatch(fetchFolders(uid))
    }
  }

  useEffect(() => {
    if (props.folder.id) {
      db.collection('folder')
        .doc(props.folder.id)
        .collection('movie')
        .get()
        .then((snapshot: any) => setMovies(snapshot.docs.map((doc: any) => doc.data())))
    }
  }, [props.folder.id])

  return {
    movies: movies,
    handleDelete: handleDelete,
    folder: props.folder,
  }
}
