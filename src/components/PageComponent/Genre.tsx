import React, { useEffect, useState } from 'react'
import { API_KEY, URL_GENRE } from '../../api'
import '../../assets/genreList.css'

interface genre{
    id: number;
    name: string;
}

interface Props {
    selectGenre: genre[];
    toggleGenre: (genre: genre) => void;
}

const Genre: React.FC<Props> = ({selectGenre, toggleGenre}) => {
    const [genres, setGenres] = useState<genre[]>([])


    useEffect(() => {
        const url = `${URL_GENRE}${API_KEY}&language=ja-JP`
        fetch(url)
        .then(response => response.json())
        .then(json => setGenres(json.genres))
    },[])
    return (
        <div className="genre-list container center"> 
        <div className="module-spacer--medium"/>
        <div className="selected-genres">{selectGenre.map((g: genre) => g.name).join(' | ')}</div>
        <div className="genres-flex">
                {genres.map((genre: genre) => (
                    <button
                        type="button"
                        key={genre.id + genre.name}
                        className="genre"
                        onClick={() => toggleGenre(genre)}
                    >
                        {genre.name}
                    </button>
                ))}
        </div>
    </div>
    )
}

export default Genre