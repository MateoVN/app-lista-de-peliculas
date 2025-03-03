import { useMemo, useRef, useState } from 'react'
import  {searchMovies}  from '../service/movies'

export function useMovies ({search, sort}) {
    const [movies , setMovies] =useState([])  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)


    const getMovies = useMemo(() => { 
        return async ({search}) => {
        if(search === previousSearch.current) return

        try{
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovie = await searchMovies({search})
            setMovies(newMovie)
        }catch (error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    },[])

    const sortedMovies = useMemo(() =>{
        console.log('getSortedMovies')
        return sort ? 
            [... movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
    },[sort, movies])
  
    return { movies:sortedMovies  ,getMovies , loading}
  }
  