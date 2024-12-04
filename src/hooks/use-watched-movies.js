import localforage from "localforage"
import { useState, useEffect } from "react"

const useWatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([])

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
  return { watchedMovies, setWatchedMovies, handleClickBtnDelete }
}

export { useWatchedMovies }
