import React, {useCallback, useEffect, useState} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import { Button, Modal } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import { FormControl, LightTooltip, TextInput } from '../UIkit';
import { addFolderMovie, deleteFolderMovie } from '../../redux/folder/operations';
import { getUid, getFolders } from '../../redux/selectors';
import {fetchFolders, makeFolder} from '../../redux/user/operations';
import {Notification} from '../'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '30%',
    width: 250,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  icon:{
    position: 'absolute',
    right: 0,
    top: '-4px',
  },
  check:{
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    padding: '5px',
},
  title:{
    height: '40px',
    lineHeight: '30px',
    borderBottom: '1px solid lightgray',
  },
  box:{
    display: 'flex',
  },
  submit:{
    fontSize: '18px',
    width: '100%',
  },
  defaultIcon:{
    height: 30,
    lineHeight: 30,
    width: 30,
    backgroundColor: 'rgb(3,37,65)',
    marginTop: '5px',
  },
  listIcon:{
    color: 'lightgray',
    width: '20px',
    height: '20px',
  }
}),
);

interface Props{
  movie:{
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: {id: number; name: string}[];
    overview: string;
    timestamp: string;
    vote_average: number;
  }
}
const FolderList:React.FC<Props> = ({movie}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const uid = getUid(selector)
    const folders = getFolders(selector)

    const [FolderOpen, setFolderOpen] = useState(false),
          [open, setOpen] = useState(false),
          [modalStyles] = useState(getModalStyle),
          [label, setLabel] = useState(''),
          [name, setName] = useState("");

    const handleClose = useCallback(() => {
      setOpen(false)
    },[setOpen, ])

    const inputName = useCallback((event) => {
      setName(event.target.value)
    },[setName])

    const handleOpen = useCallback(() =>{
      setFolderOpen(true)
    },[setFolderOpen])

    const handleFolderClose = useCallback(() => {
      setFolderOpen(false)
    },[setFolderOpen])

    const handleFolder = () => {
      if(name !== ''){
        dispatch(makeFolder(uid, name))
        dispatch(fetchFolders(uid))
        setName('')
      }
    }

    const addMovie = (id: string, check: boolean, folder:any) => {
      if(!check){
        setLabel(folder.name)
        dispatch(addFolderMovie(id, movie))
        setOpen(true)
      }else{
        dispatch(deleteFolderMovie(id, movie))
      }
    }

    useEffect(() => {
      if(uid !== ""){
        dispatch(fetchFolders(uid))
      }
    },[uid])  

  
    return (
        <>
        <div>
            <IconButton
                aria-haspopup="true"
                onClick={handleOpen}
                className={classes.defaultIcon}
            >
              <LightTooltip title="マイプレイリストに追加" placement="top">
                  <ListIcon className={classes.listIcon}/>
              </LightTooltip>
            </IconButton>     
        </div>
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={FolderOpen}
        >
          <div className={classes.paper} style={modalStyles}>
              <p className={classes.title}>保存先...</p>
              <IconButton
                onClick={() =>  handleFolderClose()}
                className={classes.icon}
              >
                <ClearIcon/>
              </IconButton>
              {folders.map((folder:any) =>
                <FormControl key={folder.id} folder={folder} func={addMovie}/>                   
              )}
                <TextInput
                  label='リスト名' fullWidth={true} multiline={false} required={true}
                  rows={1} value={name} type={"text"} onChange={inputName}
                />   
                <Button
                onClick={() => handleFolder()}
                className={classes.submit}
                >
                  作成
                </Button>       
          </div>
          </Modal>
          <Notification open={open} handleClose={handleClose} label={`${label}へ追加しました。`} />
        </>
    )
}

export default FolderList
