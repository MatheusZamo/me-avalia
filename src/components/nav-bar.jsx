import { useRef, useEffect } from "react"

const NavBar = ({ onSearchMovie, movies }) => {
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current.elements.searchMovie.value.length > 0) {
      formRef.current.reset()
    }
  }, [movies])

  return (
    <nav className="nav-bar">
      <img className="logo" src="logo-me-avalia.png" alt="Logo" />
      <form className="form-search" onSubmit={onSearchMovie} ref={formRef}>
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
}

export { NavBar }
