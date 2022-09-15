import { useState } from 'react'

export const fieldToProps = (fieldObject) => {
  const { reset, type, isNecessary, setError, errorMessage, ...rest } = fieldObject
  return rest
}

export const useField = (id, name, type='text', isNecessary=false, isSelect=false) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    if (event.target.value && type == "number" && isNaN(parseFloat(event.target.value))) {
      setError("Falsches Format")
    } 
    else if (isNecessary && event.target.value === "") {
      setError("Feld notwendig")
    }
    else if (isNecessary && isSelect && event.target.value === "") {
      
      setError("Feld notwendig")
    }
    else {
      setError("")
    }
  }
  const reset = () => setValue('')
  return {
    id,
    label: name,
    name,
    type,
    value,
    error: !!error,
    errorMessage: error,
    setError,
    helperText: error,
    onChange,
    isNecessary,
    reset
  }
}