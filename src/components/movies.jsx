import { useState, useEffect } from "react"
import { getMoviePoster } from "@/utils/get-movie-poster"

const Movies = ({ onClickMovie, movies }) => {
  const [showMovies, setShowMovies] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowMovies(false)
    }, 1000)

    return () => setShowMovies(true)
  }, [movies])

  return (
    <>
      {showMovies ? (
        <p className="loader">Carregando...</p>
      ) : (
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
      )}
    </>
  )
}

export { Movies }
