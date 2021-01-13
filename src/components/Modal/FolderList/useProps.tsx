import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks/useRedux'
import { addFolderMovie, deleteFolderMovie } from '../../../redux/folder/operations'
import { getUid, getFolders } from '../../../redux/selectors'
import { fetchFolders, makeFolder } from '../../../redux/user/operations'

const rand = () => {
  return Math.round(Math.random() * 20) - 10
}

const getModalStyle = () => {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

type Props = {
  movie: Movie
}

export const useProps = (props: Props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)

  const uid = getUid(selector)
  const folders = getFolders(selector)

  const [FolderOpen, setFolderOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState('')
  const [name, setName] = useState('')

  const handleFolder = () => {
    if (name !== '') {
      dispatch(makeFolder(uid, name))
      dispatch(fetchFolders(uid))
      setName('')
    }
  }

  const addMovie = (id: string, check: boolean, name: string) => {
    if (!check) {
      setLabel(name)
      dispatch(addFolderMovie(id, props.movie))
      setOpen(true)
    } else {
      dispatch(deleteFolderMovie(id, props.movie))
    }
  }

  useEffect(() => {
    if (uid !== '') {
      dispatch(fetchFolders(uid))
    }
  }, [uid])

  return {
    open,
    FolderOpen,
    label,
    folders,
    name,
    modalStyle,

    inputName: useCallback(
      (value: string) => {
        setName(value)
      },
      [setName],
    ),

    handleFolderOpen: useCallback(() => {
      setFolderOpen(true)
    }, [setFolderOpen]),

    handleClose: useCallback(() => {
      setOpen(false)
    }, [setOpen]),

    handleOpen: useCallback(() => {
      setOpen(true)
    }, [setOpen]),

    handleFolderClose: useCallback(() => {
      setFolderOpen(false)
    }, [setFolderOpen]),

    handleFolder,
    addMovie,
  }
}
