import * as React from 'react'

export type formOption = { value: any, label: string }

export type formValue = formOption | string | number

export type spotlightContext = {
  query: string,
  data: any
}

export interface DOMNode {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
  id?: string
}

export interface Input<valueType> extends DOMNode {
  value?: valueType
  onChange?: (value: valueType) => void

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
}
