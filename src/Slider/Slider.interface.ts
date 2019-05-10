import { Input, styledTheme } from '../_internal/types'

export type value = number | number[]

export default interface SliderProps extends Input<value> {
  customValues?: string[]
  toolTipSuffix?: string
  min?: number
  max?: number
  step?: number
  labelFormatter?: (label) => string
  range?: boolean
  indicators?: { color?: string; range: [number, number] }[]
}

export interface SliderInnerProps extends SliderProps {
  theme: styledTheme
}
