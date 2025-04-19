import React, { useEffect, useState } from 'react'

export const useDebounce = (value,delay=500) => {
    const [debounceValue,setDebounceValue] = useState(value)
    useEffect(()=>{
        const id = setTimeout(()=>{
            setDebounceValue(value)
        },delay)
        return ()=>{
            clearTimeout(id)
        }
    },[value,delay])
  return debounceValue
}