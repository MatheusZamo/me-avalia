import { useEffect } from "react"
import { History } from "@/components/history"
import { Movies } from "@/components/movies"
import { WatchedMovies } from "@/components/watched-movies"
import { MovieDetails } from "@/components/movie-details"
import { Loader } from "@/components/Loader"
import { useMovies } from "@/hooks/use-movies"

const ListBox = ({ children }) => <div className="box">{children}</div>

const Main = ({ movies, isFetchingMovies }) => {
  useEffect(() => {
    setClickedMovie(null)
  }, [movies])

  const {
    clickedMovie,
    setClickedMovie,
    isFetchingMoviesDetails,
    watchedMovies,
    handleClickBtnDelete,
    handleClickMovie,
    handleClickBtnBack,
    handleSubmitRating,
  } = useMovies()

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
