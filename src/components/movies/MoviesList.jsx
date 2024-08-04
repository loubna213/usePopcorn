import Movies from "./Movies"

const MoviesList = ({ data, onSelectMovie }) => {

    const movieElements = data.map(movie => <Movies 
        key={movie.imdbID} 
        movie={movie} 
        onSelectMovie={onSelectMovie}
        />);

    return (
        <ul className="list list-movies">
            {movieElements}
        </ul>
    )
}

export default MoviesList;