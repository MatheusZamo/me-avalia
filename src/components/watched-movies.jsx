import { getMoviePoster } from "@/utils/get-movie-poster"

const WatchedMovies = ({ watchedMovies, onClickBtnDelete, onClickMovie }) => {
  return (
    <ul className="list list-movies">
      {watchedMovies.map((movie) => (
        <li key={movie.id}>
          <img
            src={getMoviePoster(movie.poster)}
            alt={`Poster de ${movie.title}`}
            onClick={() => onClickMovie(movie)}
          />
          <h3 onClick={() => onClickMovie(movie)}>{movie.title}</h3>
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
}

export { WatchedMovies }
