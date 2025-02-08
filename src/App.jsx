import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'




function App() {
  const [sort , setSort] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies , loading} = useMovies({search, sort})
  
  const debounceGetMovies = useCallback(debounce(search =>{
    getMovies({search})
  }, 300), [getMovies])

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })

  }

  const handleChange = (event) =>{
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }
  const handleSort = (event) =>{
    setSort(!sort)
  }

  return (

    <div className='page'>
      <h1>Buscador de peliculas</h1>
      <header>
        <form action="" className='form' onSubmit={handleSubmit}>
          <input 
            style={{border: error ? "1px solid red" : "transparent"}} 
            value={search} onChange={handleChange} 
            name='serchMovie'
            type="text" 
            placeholder='Avengers, Matrix Star Wars ...' />
            <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && (<p style={{color:"red"}}>{error}</p>)}
      </header>
      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies}/>}
      </main>
    </div>
  )
}

export default App
