import { useState, useEffect } from "react"

const apiKey = import.meta.env.VITE_API_KEY

const getTotalMinutes = (watchedMovies) =>
  watchedMovies.reduce(
    (accumulator, item) =>
      accumulator + (item.runtime === "N/A" ? 0 : +item.runtime.split(" ")[0]),
    0,
  )

const getMoviePoster = (src) => (src === "N/A" ? "404-img.jpg" : src)

const NavBar = ({ onSearchMovie, movies }) => (
  <nav className="nav-bar">
    <img className="logo" src="logo-me-avalia.png" alt="Logo" />
    <form className="form-search" onSubmit={onSearchMovie}>
      <input
        name="searchMovie"
        className="search"
        type="text"
        placeholder="Buscar filmes..."
        autoFocus
        autoComplete="off"
      />
      <button className="btn-search">Buscar</button>
    </form>
    <p className="num-results">
      <strong>{movies?.length}</strong>{" "}
      {movies?.length < 2 ? "Resultado" : "Resultados"}
    </p>
  </nav>
)

const ListBox = ({ children }) => <div className="box">{children}</div>

const History = ({ watchedMovies }) => (
  <div className="summary">
    <h2>Hístorico</h2>
    <div>
      <p>
        <span>🎬</span>
        <span>{watchedMovies.length} filmes</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{getTotalMinutes(watchedMovies)} min</span>
      </p>
    </div>
    <button className="btn-toggle">-</button>
  </div>
)

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

const WatchedMovies = ({ watchedMovies, onClickBtnDelete }) => (
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

const MovieDetails = ({ clickedMovie, onClickBtnBack, onSubmitRating }) => (
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
        <form onSubmit={onSubmitRating} className="form-rating">
          <p>Qual nota você dá para este filme ?</p>
          <div>
            <select name="rating" defaultValue={1}>
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button className="btn-add">Adicionar à lista</button>
          </div>
        </form>
      </div>
      <p>
        <em>{clickedMovie.plot}</em>
      </p>
      <p>Elenco: {clickedMovie.actors}</p>
      <p>Direção: {clickedMovie.director}</p>
    </section>
  </div>
)

const App = () => {
  const [movies, setMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [watchedMovies, setWatchedMovies] = useState([])

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=harry+potter`)
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
      .catch(console.log)

    return () => setMovies()
  }, [])

  const handleSearchMovie = (e) => {
    e.preventDefault()

    const { searchMovie } = e.target.elements

    if (searchMovie < 2) {
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchMovie.value}`)
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
      .catch(console.log)
  }

  const handleClickMovie = (currentClickedMovie) => {
    const prevClickedMovie = clickedMovie

    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${currentClickedMovie.id}`,
    )
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
      .catch(console.log)
  }

  const handleClickBtnBack = () => setClickedMovie(null)

  const handleSubmitRating = (e) => {
    e.preventDefault()
    const { rating } = e.target.elements
    setWatchedMovies((prev) => [
      ...prev,
      { ...clickedMovie, userRating: rating.value },
    ])
    setClickedMovie(null)
  }

  const handleClickBtnDelete = (id) =>
    setWatchedMovies((prev) => prev.filter((p) => p.id !== id))

  return (
    <>
      <NavBar onSearchMovie={handleSearchMovie} movies={movies} />

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
    </>
  )
}
export { App }
