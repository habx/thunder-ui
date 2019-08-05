import * as React from 'react'

import ThunderUITheme from '../theme/theme.interface'

export type Except<BaseType, ExcludedElements> = Pick<
  BaseType,
  Exclude<keyof BaseType, ExcludedElements>
>

export type formOption = { value: any; label: string }

export type formValue = formOption | string | number | boolean

export type styledTheme = {
  thunderUI?: ThunderUITheme
}

export type themeAccessor = (
  props: {
    theme?: styledTheme
    warning?: boolean
    error?: boolean
  } & any, // I know it's cheating but I'm not able to fix it
  runtimeConfig?: { isRecursive?: boolean }
) => string

export interface Input<valueType> {
  value?: valueType
  onChange?: (value: valueType, event?: React.ChangeEvent) => void

  error?: boolean
  disabled?: boolean

  color?: string
}

export interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  error?: boolean
  warning?: boolean
  info?: boolean
  disabled?: boolean
  small?: boolean
  large?: boolean

  color?: string
  hoverColor?: string
}

export type styledAs = keyof JSX.IntrinsicElements | React.ComponentType<any>
export type position = 'top' | 'right' | 'left' | 'bottom'
