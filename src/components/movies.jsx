import { getMoviePoster } from "@/utils/get-movie-poster"

const Movies = ({ onClickMovie, movies }) => (
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
)

export { Movies }
