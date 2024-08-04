

const Watched = ({ watchedMovie, handleDeleteMovie }) => {

    return (
        <li>
            <img src={watchedMovie.Poster} alt={watchedMovie.Title} />
            <h3>{watchedMovie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{watchedMovie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{watchedMovie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{watchedMovie.Runtime}</span>
                </p>
            </div>
            <button onClick={() => handleDeleteMovie(watchedMovie.imdbID)} className="btn-delete">X</button>
        </li>
    )
}

export default Watched;