import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Main } from "@/components/main"
import { baseUrl } from "@/utils/base-url"

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
