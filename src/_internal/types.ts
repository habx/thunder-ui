import * as React from 'react'

import { ThunderUITheme } from '../useTheme'

export type formOption = { value: any; label: string }

export type formValue = formOption | string | number

export type styledTheme = {
  thunderUI: ThunderUITheme
}

export type themeAccessor = (props: {
  theme: styledTheme
  warning?: boolean
  error?: boolean
}) => string

export type color = string | themeAccessor

export interface DOMNode {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
  id?: string
}

export interface Input<valueType> extends DOMNode {
  value?: valueType
  onChange?: (value: valueType, event?: React.ChangeEvent) => void

  error?: boolean
  disabled?: boolean

  color?: string
}

export interface Button extends DOMNode {
  error?: boolean
  warning?: boolean
  info?: boolean
  disabled?: boolean
  small?: boolean
  large?: boolean

  color?: string
  hoverColor?: string

  type?: string
}
