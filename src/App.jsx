import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import MoviesList from './components/movies/MoviesList'
import WatchedMovies from './components/watched/WatchedMoviesList';
import Summary from './components/watched/Summary';
import StarReview from './components/StarReview';
import Box from './components/Box';
import Loader from './components/Loader';
import ErrorMessage from './components/Error';
import MovieDetails from './components/MovieDetails'


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = 'f84fc31d'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  useEffect(function () {
    async function fetchMovies() {
      try {
            setIsLoading(true)
            setError('')
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${searchQuery}`)
            if(!res.ok) throw (
              new Error('somthing went wrong with fetching movies')
            )
            const data = await res.json()

            if(data.Response === 'False') 
              throw new Error ('Movie not found')
            
            setMovies(data.Search)

          } catch (err) {
              setError(err.message)
          } finally {
              setIsLoading(false)
          }
    }

    if(searchQuery.length < 3) {
      setMovies([])
      setError('')
      return
    }

    handleCloseMovieDetails()
    fetchMovies()
  }, [searchQuery])


  const handleSelectedMovieId = (id) => {
    setSelectedMovieId(prevId => id === prevId ? null : id)
  }

  const handleCloseMovieDetails = () => {
    setSelectedMovieId(null)
  }

  const handleDeleteMovie = (id) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
}

  return (
   <>
      <Header setQuery={setSearchQuery} query={searchQuery} movies={movies}/>
      <main className='main'>

        <Box>
          {isLoading && <Loader/> }
          {!isLoading && !error && <MoviesList data={movies} onSelectMovie={handleSelectedMovieId}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>

        <Box>
          {!selectedMovieId ? <WatchedMovies data={watched} handleDeleteMovie={handleDeleteMovie}>
                                <Summary watched={watched}/>
                              </WatchedMovies>
                            : <MovieDetails watched={watched} setSelectedMovieId={setSelectedMovieId} setWatched={setWatched} onCloseMovieDetails={handleCloseMovieDetails} movies={movies} selecterMovieId={selectedMovieId}/> 
          }
        </Box>
      </main>
   </>
  )
} 

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App/>)
//root.render(<StarReview maxStars={10}/>)