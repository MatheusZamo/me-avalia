import { useState, useEffect } from "react"
import localforage from "localforage"
import { StarRating } from "./components/star-rating"
import { History } from "./components/history"
import { NavBar } from "./components/nav-bar"

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

const getMoviePoster = (src) => (src === "N/A" ? "404-img.jpg" : src)

const ListBox = ({ children }) => <div className="box">{children}</div>

const Movies = ({ onClickMovie, movies }) => (
  <ul className="list list-movies">
    <button className="btn-toggle">-</button>

    {movies?.map((movie) => (
      <li key={movie.id} onClick={() => onClickMovie(movie)}>
        <img src={getMoviePoster(movie.poster)} alt="" />
        <h3>{movie.title}</h3>
        <p>
          <span>🗓️</span>
          <span>{movie.year}</span>{" "}
        </p>
      </li>
    ))}
  </ul>
)

const WatchedMovies = ({ watchedMovies, onClickBtnDelete }) => {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <li key={movie.id}>
          <img
            src={getMoviePoster(movie.poster)}
            alt={`Poster de ${movie.title}`}
          />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime}</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => onClickBtnDelete(movie.id)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

const MovieDetails = ({ clickedMovie, onClickBtnBack, onSubmitRating }) => {
  const [rating, setRating] = useState(0)

  const handleRating = (userRating) => setRating(userRating)
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClickBtnBack}>
          &larr;
        </button>
        <img src={getMoviePoster(clickedMovie.poster)} alt={`Poster de`} />
        <div className="details-overview">
          <h2>{clickedMovie.title}</h2>
          <p>
            {clickedMovie.released} &bull; {clickedMovie.runtime}
          </p>
          <p>{clickedMovie.genre}</p>
          <p>
            <span>⭐️ </span>
            {clickedMovie.imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={26}
            color="#FCC419"
            onRating={handleRating}
          />
          <button onClick={() => onSubmitRating(rating)} className="btn-add">
            Adicionar à lista
          </button>
        </div>
        <p>
          <em>{clickedMovie.plot}</em>
        </p>
        <p>Elenco: {clickedMovie.actors}</p>
        <p>Direção: {clickedMovie.director}</p>
      </section>
    </div>
  )
}
const useWatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([])

  useEffect(() => {
    localforage
      .setItem("movies", watchedMovies)
      .catch((error) => alert(error.message))
  }, [watchedMovies])

  useEffect(() => {
    localforage
      .getItem("movies")
      .then((value) => {
        if (value) {
          setWatchedMovies(value)
        }
      })
      .catch((error) => alert(error.message))
  }, [])

  const handleClickBtnDelete = (id) =>
    setWatchedMovies((prev) => prev.filter((p) => p.id !== id))
  return { watchedMovies, setWatchedMovies, handleClickBtnDelete }
}

const useClickedMovie = (setWatchedMovies) => {
  const [clickedMovie, setClickedMovie] = useState(null)

  const handleClickMovie = (currentClickedMovie) => {
    const prevClickedMovie = clickedMovie

    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    fetch(`${baseUrl}&i=${currentClickedMovie.id}`)
      .then((response) => response.json())
      .then((movie) =>
        setClickedMovie({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          imdbRating: movie.imdbRating,
          runtime: movie.Runtime,
          poster: movie.Poster,
          plot: movie.Plot,
          actors: movie.Actors,
          director: movie.Director,
          released: movie.Released,
          genre: movie.Genre,
        }),
      )
      .catch((error) => alert(error.message))
  }

  const handleClickBtnBack = () => setClickedMovie(null)

  const handleSubmitRating = (userRating) => {
    setWatchedMovies((prev) => {
      const duplicatedMovie = prev.some((movie) => movie.id === clickedMovie.id)

      return duplicatedMovie
        ? prev.map((movie) =>
            movie.id === clickedMovie.id
              ? { ...clickedMovie, userRating }
              : movie,
          )
        : [...prev, { ...clickedMovie, userRating }]
    })
    setClickedMovie(null)
  }

  return {
    clickedMovie,
    setClickedMovie,
    handleClickMovie,
    handleClickBtnBack,
    handleSubmitRating,
  }
}

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
