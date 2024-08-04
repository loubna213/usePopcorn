
import Watched from "./Watched"

const WatchedMovies = ({ data, children, handleDeleteMovie }) => {

    const movieElements = data.map(movie => (
        <Watched key={movie.imdbID} watchedMovie={movie} handleDeleteMovie={handleDeleteMovie}/>
    ))

    return (
        <>
            {children}
            <ul className="list">
                {movieElements}
            </ul>
        </>
    )
}

export default WatchedMovies;