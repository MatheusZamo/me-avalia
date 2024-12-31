import { useState } from "react"
import { baseUrl } from "@/utils/base-url"
import { request } from "@/utils/request"

const useClickedMovie = (setWatchedMovies) => {
  const [clickedMovie, setClickedMovie] = useState(null)
  const [isFetchingMoviesDetails, setIsFetchingMoviesDetails] = useState(false)

  const handleClickMovie = (currentClickedMovie) => {
    const prevClickedMovie = clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    setIsFetchingMoviesDetails(true)

    request({
      url: `${baseUrl}&i=${currentClickedMovie.id}`,
      onSuccess: (movie) =>
        setClickedMovie({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          imdbRating: movie.imdbRating,
          runtime: movie.Runtime,
          poster: movie.Poster,
          plot: movie.Plot,
          actors: movie.Actors,
          director: movie.Director,
          released: movie.Released,
          genre: movie.Genre,
        }),
      onFinally: () => setIsFetchingMoviesDetails(false),
    })
  }

  const handleClickBtnBack = () => setClickedMovie(null)

  const handleSubmitRating = (userRating) => {
    setWatchedMovies((prev) => {
      const duplicatedMovie = prev.some((movie) => movie.id === clickedMovie.id)

      return duplicatedMovie
        ? prev.map((movie) =>
            movie.id === clickedMovie.id
              ? { ...clickedMovie, userRating }
              : movie,
          )
        : [...prev, { ...clickedMovie, userRating }]
    })
    setClickedMovie(null)
  }

  return {
    clickedMovie,
    setClickedMovie,
    handleClickMovie,
    handleClickBtnBack,
    handleSubmitRating,
    isFetchingMoviesDetails,
  }
}

export { useClickedMovie }
