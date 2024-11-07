import { useState, useEffect } from "react"

const App = () => {
  const [movies, setMovies] = useState([{}])
  const [inputValue, setInputValue] = useState("")
  const [selectedMovie, setSelectedMovie] = useState([])
  const [showDetails, setShowDetails] = useState(false)
  const [movieDetails, setMoviesDetails] = useState({})

  const APIKey = "360e928c"

  //fetch(`http://www.omdbapi.com/?apikey=${APIKey}&i=tt0304141`) request para o filme clickado

  // Request para a lista inicial
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=harry-potter`)
      .then((response) => response.json())
      .then((response) => {
        const data = response.Search

        setMovies(
          data.map(({ Title, Poster, Year, imdbID }) => ({
            Title,
            Poster,
            Year,
            imdbID,
          })),
        )
      })
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
        .then((response) => {
          const data = response.Search

          setMovies(
            data.map(({ Title, Poster, Year, imdbID }) => ({
              Title,
              Poster,
              Year,
              imdbID,
            })),
          )
        })
        .catch(console.log)
    }, 500)

    return () => clearInterval(id)
  }, [inputValue])

  //Request com todos os detalhes do filme
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&i=${selectedMovie.imdbID}`)
      .then((response) => response.json())
      .then((response) => setMoviesDetails(response))
      .catch(console.log)
  }, [selectedMovie])

  const handleSearchMovie = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const handleClickGetId = (e) => {
    const movie = movies.filter((movie) => movie.imdbID === e)
    setSelectedMovie(movie[0])
    setShowDetails(true)
  }
  const handleClickBack = () => setShowDetails(false)

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
          {movies?.length} {movies?.length < 2 ? "Resultado" : "Resultados"}
        </p>
      </nav>
      <main className="main">
        <div className="box">
          <ul className="list">
            <button className="btn-toggle">-</button>

            {movies?.map(({ Title, Poster, Year, imdbID }) => (
              <li
                className="list-movies"
                key={imdbID}
                onClick={() => handleClickGetId(imdbID)}
              >
                <img src={Poster} alt="" />
                <h3>{Title}</h3>
                <p>🗓️ {Year}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
          {!showDetails && (
            <div className="summary">
              <h2>Filmes Assistidos</h2>
              <div>
                <p>🎬 0 filmes</p>
                <p>⏳ 0 min</p>
              </div>
              <button className="btn-toggle">-</button>
            </div>
          )}

          {showDetails && (
            <div className="details">
              <header>
                <button className="btn-back" onClick={handleClickBack}>
                  &larr;
                </button>
                <img src={movieDetails.Poster} alt={`Poster de`} />
                <div className="details-overview">
                  <h2>{movieDetails.Title}</h2>
                  <p>
                    {movieDetails.Released} &bull; {movieDetails.Runtime}
                  </p>
                  <p>{movieDetails.Genre}</p>
                  <p>
                    <span>⭐️ </span>
                    {movieDetails.imdbRating} IMDb rating
                  </p>
                </div>
              </header>
              <section>
                <p>
                  <em>{movieDetails.Plot}</em>
                </p>
                <p>Elenco: {movieDetails.Actors}</p>
                <p>Direção: {movieDetails.Director}</p>
              </section>
            </div>
          )}

          <ul className="list">{/* <li className="list-watched"></li> */}</ul>
        </div>
      </main>
    </>
  )
}

export { App }
