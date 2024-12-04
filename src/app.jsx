import { useState, useEffect } from "react"
import { History } from "./components/history"
import { NavBar } from "./components/nav-bar"
import { Movies } from "./components/movies"
import { WatchedMovies } from "./components/watched-movies"
import { MovieDetails } from "./components/movie-details"
import { useWatchedMovies } from "./hooks/use-watched-movies"
import { useClickedMovie } from "./hooks/use-clicked-movie"
import { baseUrl } from "./utils/base-url"

const ListBox = ({ children }) => <div className="box">{children}</div>

const Main = ({ movies }) => {
  useEffect(() => {
    setClickedMovie(null)
  }, [movies])

  const { watchedMovies, setWatchedMovies, handleClickBtnDelete } =
    useWatchedMovies()

  const {
    clickedMovie,
    setClickedMovie,
    handleClickMovie,
    handleClickBtnBack,
    handleSubmitRating,
  } = useClickedMovie(setWatchedMovies)

  return (
    <main className="main">
      <ListBox>
        <Movies movies={movies} onClickMovie={handleClickMovie} />
      </ListBox>
      <ListBox>
        {clickedMovie ? (
          <MovieDetails
            clickedMovie={clickedMovie}
            onSubmitRating={handleSubmitRating}
            onClickBtnBack={handleClickBtnBack}
          />
        ) : (
          <>
            <History
              watchedMovies={watchedMovies}
              onClickBtnBack={handleClickBtnBack}
              onSubmitRating={handleSubmitRating}
            />

            {watchedMovies.length > 0 && (
              <WatchedMovies
                watchedMovies={watchedMovies}
                onClickBtnDelete={handleClickBtnDelete}
              />
            )}
          </>
        )}
      </ListBox>
    </main>
  )
}

const App = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}&s=harry+potter`)
      .then((response) => response.json())
      .then((data) =>
        setMovies(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        ),
      )
      .catch((error) => alert(error.message))

    return () => setMovies()
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()

    const { searchMovie } = e.target.elements

    if (searchMovie < 2) {
      return
    }

    fetch(`${baseUrl}&s=${searchMovie.value}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(
          data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          })),
        )
      })
      .catch((error) => alert(error.message))
  }

  return (
    <>
      <NavBar onSearchMovie={handleSearchMovie} movies={movies} />
      <Main movies={movies} />
    </>
  )
}
export { App }
