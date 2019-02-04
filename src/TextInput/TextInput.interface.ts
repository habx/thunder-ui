import * as React from 'react'
import { Input } from '../_internal/types'

export default interface TextInputProps extends Input<string | number> {
  rightElement?: React.ReactNode
  rightHoverElement?: React.ReactNode
  borderColor?: string
  placeholder?: string
  inputRef?: () => any
  loading?: boolean
  small?: boolean
}
