import { getMoviePoster } from "../utils/get-movie-poster"

const WatchedMovies = ({ watchedMovies, onClickBtnDelete }) => {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <li key={movie.id}>
          <img
            src={getMoviePoster(movie.poster)}
            alt={`Poster de ${movie.title}`}
          />
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
