import { useState } from "react"
// const APIKey = "360e928c"
// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}`)
//fetch(`http://www.omdbapi.com/?s=Batman&apikey=360e928c`)
//[{ Title, Poster, Year, imdbID }]

const App = () => {
  const [movies, setMovies] = useState([])

  fetch(`http://www.omdbapi.com/?s=Batman&apikey=360e928c`)
    .then((response) => response.json())
    .then((response) => console.log(response))
  // .then((response) => {
  //   const [{ Title, Poster, Year, imdbID }] = response.Search

  //   console.log(Year)
  // })
  // .catch(console.log)

  return (
    <>
      <nav className="nav-bar">
        <img className="logo" src="logo-me-avalia.png" alt="Logo" />
        <form className="form-search">
          <input
            className="search"
            type="text"
            placeholder="Buscar filmes..."
          />
          <button className="btn-search">Buscar</button>
        </form>
        <p className="num-results">
          {movies.length} {movies.length < 2 ? "Resultado" : "Resultados"}
        </p>
      </nav>
      <main className="main">
        <div className="box">
          <ul className="list">
            <button className="btn-toggle">-</button>

            {/* {movies.map(({ Title, Poster, Year, imdbID }) => (
              <li className="list-movies" key={imdbID}>
                <img src={Poster} alt="" />
                <h3>{Title}</h3>
                <p>🗓️ {Year}</p>
              </li>
            ))} */}
          </ul>
        </div>
        <div className="box">
          <div className="summary">
            <h2>Filmes Assistidos</h2>
            <div>
              <p>🎬 0 filmes</p>
              <p>⏳ 0 min</p>
            </div>
            <button className="btn-toggle">-</button>
          </div>
          <ul className="list">{/* <li className="list-watched"></li> */}</ul>
        </div>
      </main>
    </>
  )
}

export { App }
