
const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Summary = ({ watched }) => {

    const avgImdbRating = average(watched.map((movie) => Number(movie.imdbRating)));
    const avgUserRating = average(watched.map((movie) => Number(movie.userRating)));
    const avgRuntime = average(watched.map((movie) => Math.round(Number(movie.Runtime.split(' ').at(0)))));

    return (
        <div className="summary">
            <h2>movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}

export default Summary;