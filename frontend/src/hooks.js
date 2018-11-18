import { useEffect } from 'react'

export const useOnMount = onMount =>
  useEffect(() => {
    onMount && onMount()
  }, [])
