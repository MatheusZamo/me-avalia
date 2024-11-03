// const APIKey = "360e928c"
// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}`)

fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=360e928c`)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch(console.log)

const App = () => {
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
        <p className="num-results"># Resultados</p>
      </nav>
      <main className="main">
        <div className="box">
          <ul className="list">
            <button className="btn-toggle">-</button>
            <li className="list-movies">
              <img src="https://placehold.co/600x800" alt="" />
              <h3>Name</h3>
              <p>🗓️ Year</p>
            </li>
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
