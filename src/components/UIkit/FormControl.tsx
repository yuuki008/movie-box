import React, { useState, useCallback, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFolderMovie } from '../../redux/folder/operations'
import { getFolderMovies, getMovieDetail } from '../../redux/selectors'
import { db } from '../../firebase'

const useStyles = makeStyles({
    check: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        padding: '5px',
    },
    box: {
        display: 'flex',
    },
})

interface Props {
    folder: { name: string; id: string }
    func: any
}

const FormControl: React.FC<Props> = ({ folder, func }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)

    const movie = getMovieDetail(selector)
    const [check, setCheck] = useState(false)
    const [movies, setMovies] = useState([])

    const toggleCheck = useCallback(
        (check) => {
            func(folder.id, check, folder)
            setCheck(!check)
        },
        [setCheck, check],
    )

    useEffect(() => {
        db.collection('folder')
            .doc(folder.id)
            .collection('movie')
            .get()
            .then((snapshot: any) => {
                setMovies(snapshot.docs.map((doc: any) => doc.data()))
            })
    }, [])

    useEffect(() => {
        if (movies.length > 0) {
            const list = []
            movies.map((item: any) => {
                console.log(item.id, movie.item.id)
                if (item.id === movie.item.id) {
                    list.push(item)
                }
            })
            if (list.length > 0) {
                setCheck(true)
            } else {
                setCheck(false)
            }
        }
    }, [movies])

    return (
        <FormControlLabel
            label={folder.name}
            className={classes.check}
            control={
                <Checkbox
                    name={folder.name}
                    id={folder.id}
                    color="default"
                    className={classes.box}
                    checked={check}
                    onChange={() => toggleCheck(check)}
                />
            }
        />
    )
}

export default FormControl
