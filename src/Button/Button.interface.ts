import * as React from 'react'

import { Button, styledAs } from '../_internal/types'

export default interface ButtonProps extends Button {
  reverse?: boolean
  loading?: boolean
  textColor?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  as?: styledAs
}
