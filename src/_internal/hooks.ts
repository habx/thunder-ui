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

export const useIsSmallScreen = (breakpoint: number = 600) => {
  const width = useWindowWidth()

  return width <= 600
}

