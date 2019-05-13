import * as React from 'react'
import { ThemeContext } from 'styled-components'

import ThunderUITheme from './theme/theme.interface'

type fullTheme = {
  thunderUI: ThunderUITheme
}

const useTheme = () => {
  const fullTheme: fullTheme = React.useContext(ThemeContext)

  return fullTheme.thunderUI
}

export default useTheme
