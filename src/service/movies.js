const API_KEY = "db9ab6be"

export async function searchMovies({search}) {

    if (search === "") return null
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`

    try{
        const response = await fetch(url)

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fail fetch ${response.status}`)
        }

        const data = await response.json()
        const movies = data.Search

        return movies?.map(movie =>({
            poster:movie.Poster,
            title:movie.Title,
            type:movie.Type,
            year:movie.Year,
            id:movie.imdbID
          }))

    } catch (error){
        console.error("Error al intentar acceder al servidor", error)
    }
}