import { getMoviePoster } from "@/utils/get-movie-poster"

const WatchedMovies = ({ watchedMovies, onClickBtnDelete, onClickMovie }) => {
  const handleClickDelete = ({ e, id }) => {
    e.stopPropagation()
    onClickBtnDelete(id)
  }
  return (
    <ul className="list list-movies">
      {watchedMovies.map((movie) => (
        <li key={movie.id} onClick={() => onClickMovie(movie)}>
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
              onClick={(e) => handleClickDelete({ e, id: movie.id })}
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
