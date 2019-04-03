import * as React from 'react'

export const useWindowWidth = () => {
  const [ width, setWidth ] = React.useState(
    typeof window === 'object' ? window.innerWidth : 0
  )

  React.useEffect(() => {
    if (typeof window === 'object') {
      const handleResize = () => setWidth(window.innerWidth)

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return width
}

export const useOnWindowResize = (onResize: () => void, effectInputs?: any[]) => {
  React.useEffect(() => {
    const handleResize = onResize
    document.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('resize', handleResize)
    }
  }, [onResize, ...effectInputs]) // eslint-disable-line
}

export const useIsSmallScreen = (breakpoint: number = 600) => {
  const width = useWindowWidth()

  return width <= breakpoint
}
