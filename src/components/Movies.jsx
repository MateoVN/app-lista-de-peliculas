function ListOfMovies ({movies}){
    return(
        <ul className="movies">
            {
              movies.map(movie => (
                <li className="movie" key={movie.id}>
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <img src={movie.poster} alt={`El poster de la pelicula ${movie.Title}`} />
                </li>
              ))
            }
        </ul>
    )
}

 function NoMoviesResult(){
    return(
        <p>No se encontraron peliculas para esta busqueda</p>
    )
}

export function Movies ({movies}){ 
    const hasMovies = movies?.length > 0
    return(

        hasMovies ?(
            <ListOfMovies movies={movies}/>
          ):(
            <NoMoviesResult/>
          )
    )
}