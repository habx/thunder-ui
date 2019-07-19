import * as React from 'react'
import { ThemeContext } from 'styled-components'

import theme from './theme'
import ThunderUITheme from './theme/theme.interface'

type fullTheme = {
  thunderUI: ThunderUITheme
}

const useTheme = () => {
  const fullTheme: fullTheme = React.useContext(ThemeContext)

  if (!fullTheme) {
    return theme.light
  }

  return fullTheme.thunderUI
}

export default useTheme
