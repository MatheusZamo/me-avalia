import { useState, useEffect } from "react"
import { StarRating } from "@/components/star-rating"
import { getMoviePoster } from "@/utils/get-movie-poster"

const MovieDetails = ({ clickedMovie, onClickBtnBack, onSubmitRating }) => {
  const [rating, setRating] = useState(0)
  const [showMovies, setShowMovies] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowMovies(false)
    }, 1000)

    return () => setShowMovies(true)
  }, [clickedMovie])

  const handleRating = (userRating) => setRating(userRating)

  return (
    <>
      {showMovies ? (
        <p className="loader">Carregando...</p>
      ) : (
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
              <button
                onClick={() => onSubmitRating(rating)}
                className="btn-add"
              >
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
      )}
    </>
  )
}

export { MovieDetails }
