import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFolderMovie, deleteFolderMovie } from '../../../redux/folder/operations'
import { getUid, getFolders } from '../../../redux/selectors'
import { fetchFolders, makeFolder } from '../../../redux/user/operations'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
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

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const inputName = useCallback(
    (value: string) => {
      setName(value)
    },
    [setName],
  )

  const handleOpen = useCallback(() => {
    setFolderOpen(true)
  }, [setFolderOpen])

  const handleFolderClose = useCallback(() => {
    setFolderOpen(false)
  }, [setFolderOpen])

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
    open: open,
    FolderOpen: FolderOpen,
    label: label,
    folders: folders,
    name: name,
    modalStyle: modalStyle,
    handleClose: handleClose,
    inputName: inputName,
    handleOpen: handleOpen,
    handleFolderClose: handleFolderClose,
    handleFolder: handleFolder,
    addMovie: addMovie,
  }
}
