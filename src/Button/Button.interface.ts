import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface ButtonProps extends DOMNode {
  warning?: boolean
  error?: boolean
  disabled?: boolean
  small?: boolean
  reverse?: boolean
  loading?: boolean
  backgroundColor?: string
  textColor?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}
