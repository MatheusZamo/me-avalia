import { useEffect } from "react"
import { History } from "@/components/history"
import { Movies } from "@/components/movies"
import { WatchedMovies } from "@/components/watched-movies"
import { MovieDetails } from "@/components/movie-details"
import { Loader } from "@/components/Loader"
import { useWatchedMovies } from "@/hooks/use-watched-movies"
import { useClickedMovie } from "@/hooks/use-clicked-movie"

const ListBox = ({ children }) => <div className="box">{children}</div>

const Main = ({ movies, isFetchingMovies }) => {
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
    isFetchingMoviesDetails,
  } = useClickedMovie(setWatchedMovies)

  return (
    <main className="main">
      <ListBox>
        {isFetchingMovies ? (
          <Loader />
        ) : (
          <Movies movies={movies} onClickMovie={handleClickMovie} />
        )}
      </ListBox>
      <ListBox>
        {isFetchingMoviesDetails ? (
          <Loader />
        ) : clickedMovie ? (
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
                onClickMovie={handleClickMovie}
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
