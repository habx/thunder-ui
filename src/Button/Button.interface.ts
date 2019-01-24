import * as React from 'react'

import DOMInterface from '../_internal/domInterface'

export default interface ButtonProps extends DOMInterface {
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
