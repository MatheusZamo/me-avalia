import { useState } from "react"
import { StarRating } from "@/components/star-rating"
import { getMoviePoster } from "@/utils/get-movie-poster"

const MovieDetails = ({
  clickedMovie,
  onClickBtnBack,
  onSubmitRating,
  watchedMovies,
}) => {
  const userRating = watchedMovies.find(
    (movie) => movie.id === clickedMovie.id,
  )?.userRating
  const [rating, setRating] = useState(userRating ?? 0)

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
            initialRating={rating}
          />
          <button onClick={() => onSubmitRating(rating)} className="btn-add">
            {userRating >= 0 ? "Alterar nota" : "+ Adicionar a lista"}
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

export { MovieDetails }
