import * as React from 'react'

import { styledTheme } from '../_internal/types'

type Li = React.HTMLAttributes<HTMLLIElement>

export default interface NavBarProps
  extends Pick<Li, Exclude<keyof Li, 'title'>> {
  backgroundColor?: string
  activeBackgroundColor?: string
  title?: React.ReactElement<any>
}

export interface NavBarInnerProps extends NavBarProps {
  theme: styledTheme
}

export interface NavBarContextProps {
  isInsideANavBar: boolean
  activeBackgroundColor?: string
}
