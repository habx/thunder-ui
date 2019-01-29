import * as React from 'react'
import { Input} from '../_internal/types'

export default interface TextInputProps extends Input<string | number> {
  rightElement?: React.ReactNode
  rightHoverElement?: React.ReactNode
  activeBorderColor?: string
  borderColor?: string
  placeholder?: string
  inputRef?: () => any
  loading?: boolean
  small?: boolean
}
