import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface TextInputProps extends DOMInterface {
  onChange?: (value) => void
  loading?: boolean
  rightElement?: React.ReactNode
  rightHoverElement?: React.ReactNode
  activeBorderColor?: string
  color?: string
  borderColor?: string
  error?: boolean
  errorColor?: string
  inputRef?: () => any
}
