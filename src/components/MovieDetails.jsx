import { useState, useEffect } from "react"
import StarReview from "./StarReview";
import Loader from "./Loader";

const MovieDetails = ({ watched, setWatched, selecterMovieId, onCloseMovieDetails }) => {
    const [movieDeatils, setMovieDeatails] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const isWatched = watched.map(movie => movie.imdbID).includes(selecterMovieId)
    const watchedMovieRating = watched.find(movie => movie.imdbID === selecterMovieId)?.userRating

    console.log(movieDeatils.Title)

    const KEY = 'f84fc31d'
    useEffect(function () {
        async function fetchMovies() {
            setIsLoading(true)
            const res = await fetch(`http://omdbapi.com/?apikey=${KEY}&i=${selecterMovieId}`)
            const data = await res.json()
            //console.log(data)
            setMovieDeatails(data)
            setIsLoading(false)
        }
        fetchMovies()
    }, [selecterMovieId])
    

    const handleAddList = (watchedMovies) => {
        setWatched(prevWatched => [...prevWatched, {...watchedMovies, userRating: userRating}])
        onCloseMovieDetails()
    }

    useEffect(function () {
        if(!movieDeatils.Title) return;
        document.title = `Movie | ${movieDeatils.Title}`;

        return function cleanUp() {
            document.title = 'usePopcorn';
        }
        
    }, [movieDeatils.Title])

    const movieDetailsElements = 
        <div className="details">
            {
                !isLoading ? ( <>
                    <button onClick={onCloseMovieDetails} className="btn-back">&larr;</button>
                    <header>
                        <img src={movieDeatils.Poster} alt={movieDeatils.Title} />
                        <div className="details-overview">
                            <h2>{movieDeatils.Title}</h2>
                            <p>
                                <span>{movieDeatils.Released}</span>
                                &bull;
                                <span>{movieDeatils.Runtime}</span>
                            </p>
                            <p>{movieDeatils.Genre}</p>
                            <p>
                                <span>⭐️</span>
                                <p>{movieDeatils.imdbRating} IMDb rating</p>
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            { !isWatched ?   
                                <>
                                    <StarReview maxStars={10} onSetRating={setUserRating}/>
                                    {
                                        userRating > 0 && <button onClick={() => handleAddList(movieDeatils)} className="btn-add">Add to list +</button>
                                        
                                    }
                                </>
                                : <p>You rated with movie {watchedMovieRating} ⭐️</p>
                            }
                        </div>
                        <p><em>{movieDeatils.Plot}</em></p>
                        <p>{movieDeatils.Actors}</p>
                        <p>Directed by {movieDeatils.Director}</p>
                    </section>
                </>)
            : <Loader/>
            }
        </div>
        

    return (
        <>
            {movieDetailsElements}
        </>
    )
}

export default MovieDetails;