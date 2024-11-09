import { useState, useEffect } from "react"

const getTotalMinutes = (watchedMovies) =>
  watchedMovies.reduce(
    (accumulator, item) => accumulator + +item.runtime.split("")[0],
    0,
  )

const App = () => {
  const [movies, setMovies] = useState([])
  const [clickedMovie, setClickedMovie] = useState(null)
  const [watchedMovies, setWatchedMovies] = useState([])

  const [inputValue, setInputValue] = useState("")

  const APIKey = "360e928c"

  // Request para a lista inicial
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&i=tt0304141`)
      .then((response) => response.json())
      .then((data) =>
        setMovies(
          data.map((movie) => ({
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
          })),
        ),
      )
      .catch(console.log)

    return () => setMovies()
  }, [])

  //Requests de acordo com a mudança do input
  useEffect(() => {
    if (!movies) {
      return
    }

    const id = setTimeout(() => {
      fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${inputValue}`)
        .then((response) => response.json())
        .then((data) =>
          setMovies(
            data.map((movie) => ({
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
            })),
          ),
        )
        .catch(console.log)
    }, 500)

    return () => clearInterval(id)
  }, [inputValue])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const handleClickMovie = (clickedMovie) => {
    setClickedMovie((prev) =>
      prev?.id === clickedMovie.id ? null : clickedMovie,
    )
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

  const handleCLickBtnDelete = (id) =>
    setWatchedMovies((prev) => prev.filter((p) => p.id !== id))

  return (
    <>
      <nav className="nav-bar">
        <img className="logo" src="logo-me-avalia.png" alt="Logo" />
        <form className="form-search">
          <input
            className="search"
            type="text"
            placeholder="Buscar filmes..."
            onChange={handleSearchMovie}
            value={inputValue}
          />
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results">
          <strong>{movies?.length}</strong>{" "}
          {movies?.length < 2 ? "Resultado" : "Resultados"}
        </p>
      </nav>
      <main className="main">
        <div className="box">
          <ul className="list">
            <button className="btn-toggle">-</button>

            {movies?.map((movie) => (
              <li
                className="list-movies"
                key={movie.imdbID}
                onClick={() => handleClickMovie(movie)}
              >
                <img src={movie.Poster} alt="" />
                <h3>{movie.Title}</h3>
                <p>
                  <span>🗓️</span>
                  <span>{movie.Year}</span>{" "}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
          {clickedMovie ? (
            <div className="details">
              <header>
                <button className="btn-back" onClick={handleClickBtnBack}>
                  &larr;
                </button>
                <img src={clickedMovie.Poster} alt={`Poster de`} />
                <div className="details-overview">
                  <h2>{clickedMovie.Title}</h2>
                  <p>
                    {clickedMovie.Released} &bull; {clickedMovie.Runtime}
                  </p>
                  <p>{clickedMovie.Genre}</p>
                  <p>
                    <span>⭐️ </span>
                    {clickedMovie.imdbRating} IMDb rating
                  </p>
                </div>
              </header>
              <section>
                <div className="rating">
                  <form onSubmit={handleSubmitRating} className="form-rating">
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
                  <em>{clickedMovie.Plot}</em>
                </p>
                <p>Elenco: {clickedMovie.Actors}</p>
                <p>Direção: {clickedMovie.Director}</p>
              </section>
            </div>
          ) : (
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
          )}

          <ul className="list">
            {watchedMovies.map((movie) => (
              <li key={movie.id}>
                <img src={movie.poster} alt={`Poster de ${movie.title}`} />
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
                    onClick={() => handleCLickBtnDelete(movie.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
export { App }
