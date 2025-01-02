import { useState, useEffect } from "react"
import localforage from "localforage"
import { baseUrl } from "@/utils/base-url"
import { request } from "@/utils/request"

const useMovies = () => {
  const [clickedMovie, setClickedMovie] = useState(null)
  const [watchedMovies, setWatchedMovies] = useState([])
  const [isFetchingMoviesDetails, setIsFetchingMoviesDetails] = useState(false)

  useEffect(() => {
    localforage
      .setItem("movies", watchedMovies)
      .catch((error) => alert(error.message))
  }, [watchedMovies])

  useEffect(() => {
    localforage
      .getItem("movies")
      .then((value) => {
        if (value) {
          setWatchedMovies(value)
        }
      })
      .catch((error) => alert(error.message))
  }, [])

  const handleClickBtnDelete = (id) =>
    setWatchedMovies((prev) => prev.filter((p) => p.id !== id))

  const handleClickMovie = (currentClickedMovie) => {
    const prevClickedMovie = clickedMovie
    if (prevClickedMovie?.id === currentClickedMovie.id) {
      setClickedMovie(null)
      return
    }

    const cachedMovie = watchedMovies.find(
      (movie) => movie.id === currentClickedMovie.id,
    )
    if (cachedMovie) {
      setClickedMovie(cachedMovie)
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
    isFetchingMoviesDetails,
    watchedMovies,
    handleClickBtnDelete,
    handleClickMovie,
    handleClickBtnBack,
    handleSubmitRating,
  }
}

export { useMovies }
