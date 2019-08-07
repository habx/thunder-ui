import { Input } from '../_internal/types'

export default interface SliderProps extends Input<any> {
  customValues?: string[]
  min?: number
  max?: number
  step?: number
  range?: boolean
  dots?: boolean
  indicators?: { color?: string; range: [number, number] }[]

  tooltipFormatter?: (
    label: string | number | [number, number],
    rawTooltip: string
  ) => string
  tooltipRangeSeparator?: string
  tooltipSuffix?: string
}
