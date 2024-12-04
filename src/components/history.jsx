const getTotalMinutes = (watchedMovies) =>
  watchedMovies.reduce(
    (accumulator, item) =>
      accumulator + (item.runtime === "N/A" ? 0 : +item.runtime.split(" ")[0]),
    0,
  )

const singularOrPlural = (watchedMovies) =>
  watchedMovies.length === 1 ? "filme" : "filmes"

const History = ({ watchedMovies }) => (
  <div className="summary">
    <h2>Hístorico</h2>
    <div>
      <p>
        <span>🎬</span>
        <span>
          {watchedMovies.length} {singularOrPlural(watchedMovies)}
        </span>
      </p>
      <p>
        <span>⏳</span>
        <span>{getTotalMinutes(watchedMovies)} min</span>
      </p>
    </div>
    <button className="btn-toggle">-</button>
  </div>
)

export { History }
