import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ListIcon from '@material-ui/icons/List'
import IconButton from '@material-ui/core/IconButton'
import { Button, Modal } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { FormControl, LightTooltip, TextInput } from '../../'
import { Notification } from '../../'
import styled from 'styled-components'

type Props = {
  open: boolean
  FolderOpen: boolean
  folders: Folder[]
  label: string
  name: string
  modalStyle: any
  handleClose: () => void
  inputName: (value: string) => void
  handleOpen: () => void
  handleFolderClose: () => void
  handleFolder: () => void
  addMovie: (id: string, check: boolean, name: string) => void
}

export const Layout = (props: Props) => {
  const classes = useStyles()
  return (
    <>
      <IconWrapper>
        <IconButton aria-haspopup="true" onClick={props.handleOpen} className={classes.defaultIcon}>
          <LightTooltip title="マイプレイリストに追加" placement="top">
            <ListIcon className={classes.listIcon} />
          </LightTooltip>
        </IconButton>
      </IconWrapper>
      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={props.FolderOpen}>
        <ModalWrapper className={classes.paper} style={props.modalStyle}>
          <ModalTitle>保存先...</ModalTitle>
          <IconButton onClick={() => props.handleFolderClose()} className={classes.icon}>
            <ClearIcon />
          </IconButton>
          {props.folders.map((folder: any) => (
            <FormControl key={folder.id} folder={folder} func={props.addMovie} />
          ))}
          <TextInput
            label="リスト名"
            fullWidth={true}
            multiline={false}
            required={true}
            rows={1}
            value={props.name}
            type={'text'}
            onChange={props.inputName}
          />
          <Button onClick={() => props.handleFolder()} className={classes.submit}>
            作成
          </Button>
        </ModalWrapper>
      </Modal>
      <Notification open={props.open} handleClose={props.handleClose} label={`${props.label}へ追加しました。`} />
    </>
  )
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
    icon: {
      position: 'absolute',
      right: 0,
      top: '-4px',
    },
    check: {
      display: 'flex',
      width: '100%',
      textAlign: 'center',
      padding: '5px',
    },
    box: {
      display: 'flex',
    },
    submit: {
      fontSize: '18px',
      width: '100%',
    },
    defaultIcon: {
      height: 30,
      lineHeight: 30,
      width: 30,
      backgroundColor: 'rgb(3,37,65)',
      marginTop: '5px',
    },
    listIcon: {
      color: 'lightgray',
      width: '20px',
      height: '20px',
    },
  }),
)

const IconWrapper = styled.div``

const ModalWrapper = styled.div``

const ModalTitle = styled.div({
  height: '40px',
  lineHeight: '30px',
  borderBottom: '1px solid lightgray',
  fontWeight: 550,
  fontSize: '15px',
})
