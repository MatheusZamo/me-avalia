import { useEffect } from "react"
import { History } from "./history"
import { Movies } from "./movies"
import { WatchedMovies } from "./watched-movies"
import { MovieDetails } from "./movie-details"
import { useWatchedMovies } from "../hooks/use-watched-movies"
import { useClickedMovie } from "../hooks/use-clicked-movie"

const ListBox = ({ children }) => <div className="box">{children}</div>

const Main = ({ movies }) => {
  useEffect(() => {
    setClickedMovie(null)
  }, [movies])

  const { watchedMovies, setWatchedMovies, handleClickBtnDelete } =
    useWatchedMovies()

  const {
    clickedMovie,
    setClickedMovie,
    handleClickMovie,
    handleClickBtnBack,
    handleSubmitRating,
  } = useClickedMovie(setWatchedMovies)

  return (
    <main className="main">
      <ListBox>
        <Movies movies={movies} onClickMovie={handleClickMovie} />
      </ListBox>
      <ListBox>
        {clickedMovie ? (
          <MovieDetails
            clickedMovie={clickedMovie}
            onSubmitRating={handleSubmitRating}
            onClickBtnBack={handleClickBtnBack}
          />
        ) : (
          <>
            <History
              watchedMovies={watchedMovies}
              onClickBtnBack={handleClickBtnBack}
              onSubmitRating={handleSubmitRating}
            />

            {watchedMovies.length > 0 && (
              <WatchedMovies
                watchedMovies={watchedMovies}
                onClickBtnDelete={handleClickBtnDelete}
              />
            )}
          </>
        )}
      </ListBox>
    </main>
  )
}

export { Main }
