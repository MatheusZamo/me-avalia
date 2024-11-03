const App = () => {
  return (
    <>
      <nav className="nav-bar">
        <img className="logo" src="logo-me-avalia.png" alt="Logo" />
        <input className="search" type="text" />
        <p className="num-results">Resultados</p>
      </nav>
      <main className="main"></main>
      <div className="box"></div>
    </>
  )
}

export { App }
