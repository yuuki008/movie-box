import React, { useState, useCallback, useEffect } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import { getMovieDetail } from '../../redux/selectors'
import { db } from '../../firebase'

type Props = {
    folder: { name: string; id: string }
    func: (id: string, check: boolean, name: string) => void
}

const FormControl: React.FC<Props> = (props: Props) => {
    const classes = useStyles()
    const selector = useSelector((state) => state)

    const movie = getMovieDetail(selector)
    const [check, setCheck] = useState(false)
    const [movies, setMovies] = useState([])

    const toggleCheck = useCallback(
        (check: boolean) => {
            props.func(props.folder.id, check, props.folder.name)
            setCheck(!check)
        },
        [setCheck, check],
    )

    useEffect(() => {
        db.collection('folder')
            .doc(props.folder.id)
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
            label={props.folder.name}
            className={classes.check}
            control={
                <Checkbox
                    name={props.folder.name}
                    id={props.folder.id}
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
