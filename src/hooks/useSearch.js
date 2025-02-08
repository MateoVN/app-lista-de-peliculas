import { useEffect, useRef, useState } from "react"

export function useSearch(){
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  useEffect(() =>{
    if(isFirstInput.current){
        isFirstInput.current = search === ""
        return
    }
    if(search === ''){
      setError('No se pude buscar una pelicula vacía.')
      return
    }
    if(search.match(/^\d+$/)){
      setError('No se pude buscar una pelicula con un numero.')
      return
    }
    if(search.length < 0){
      setError("La busqueda debe tener almenos 3 carateres.")
      return
    }
    setError(null)
  },[search])
  return {search, setSearch, error}

}