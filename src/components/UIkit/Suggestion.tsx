import React, { useState, useCallback } from 'react'
import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL } from '../../api'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import logo from '../../assets/images/logo_square.svg'
import Autosuggest from 'react-autosuggest'
import styled from 'styled-components'

const Suggestion = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(''),
        [suggestions, setSuggestions] = useState([])

    const inputValue = useCallback((event) => {
        setValue(event.target.value)
    }, [])

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            return handleSubmit(value)
        }
    }

    const handleSubmit = (value: string) => {
        dispatch(push('/search/' + value))
        setValue('')
    }

    const getSuggestionValue = (suggestion: any): string => {
        return suggestion.title
    }

    const onSuggestionsFetchRequested = () => {
        const trimValue = value.trim()
        if (trimValue.length > 0) {
            const url = URL_SEARCH + trimValue + API_KEY_ALT
            fetch(url)
                .then((response) => response.json())
                .then((json) => json.results)
                .then((data) => {
                    const results = data.map((movie: any) => {
                        const temp = {
                            id: movie.id,
                            title: movie.title,
                            img: movie.poster_path,
                            year: movie.release_date === '' ? '0000' : movie.release_date.substring(0, 4),
                        }
                        return temp
                    })
                    setSuggestions(results)
                })
                .catch(() => console.log('該当の作品はありません'))
        } else {
            setSuggestions([])
        }
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const renderSuggestion = (suggestion: any) => {
        return (
            <div>
                <MovieImage alt="" src={suggestion.img === null ? logo : URL_IMG + IMG_SIZE_XSMALL + suggestion.img} />
                <MovieTitle>
                    <div>{suggestion.title}</div>
                    {suggestion.year}
                </MovieTitle>
            </div>
        )
    }

    const onSuggestionSelected = (event: any, { suggestion, method }: any) => {
        if (method === 'enter' || method === 'click') {
            event.preventDefault()
            dispatch(push('/movie/' + suggestion.id))
            setValue('')
        }
    }

    const input = {
        value,
        onChange: inputValue,
        onKeyPress: handleKeyDown,
        placeholder: '作品名',
    }
    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={input}
        />
    )
}

export default Suggestion

const MovieImage = styled.img({
    width: '40px',
    height: '50px',
    float: 'left',
    marginRight: '8px',
    borderRadius: '3px',
})

const MovieTitle = styled.div({
    color: 'black',
    lineHeight: '21px',
    overflow: 'hidden',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    div: {
        fontWeight: 'bold',
    },
})
