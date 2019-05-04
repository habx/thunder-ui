import * as React from 'react'

import { Input, styledTheme } from '../_internal/types'

export default interface TextInputProps extends Input<string | number> {
  rightElement?: React.ReactNode
  rightHoverElement?: React.ReactNode
  borderColor?: string
  placeholder?: string
  inputRef?: () => any
  loading?: boolean
  small?: boolean
}

export interface TextInputInnerProps extends TextInputProps {
  theme: styledTheme
}
