import * as React from 'react'

import { ThemeContext } from 'styled-components'

export type ThunderUITheme = {
  error?: string
  warning?: string

  primaryLighter?: string
  primaryLight?: string
  primary?: string

  neutralLighter?: string
  neutralLight?: string
  neutral?: string
  neutralStrong?: string
  neutralStronger?: string
}

type fullTheme = {
  thunderUI: ThunderUITheme
}

const useTheme = () => {
  const fullTheme: fullTheme = React.useContext(ThemeContext)

  return fullTheme.thunderUI
}

export default useTheme
