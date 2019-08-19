import * as React from 'react'

import { Except, Input, styledAs } from '../_internal/types'

export default interface TextInputProps
  extends Input<string | number>,
    Except<React.InputHTMLAttributes<HTMLInputElement>, keyof Input<any>> {
  rightElement?: React.ReactNode
  rightHoverElement?: React.ReactNode
  borderColor?: string
  placeholder?: string
  inputRef?: () => any
  loading?: boolean
  small?: boolean
  as?: styledAs
}
