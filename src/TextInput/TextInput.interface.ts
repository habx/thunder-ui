import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface TextInputProps extends DOMInterface {
  value: string | number
  onChange?: (value) => void
  rightElement?: React.ReactNode
  rightHoverElement?: React.ReactNode
  activeBorderColor?: string
  color?: string
  borderColor?: string
  error?: boolean
  loading?: boolean
  disabled?: boolean
  errorColor?: string
  placeholder?: string
  inputRef?: () => any
}
