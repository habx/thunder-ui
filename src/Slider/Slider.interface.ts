import { Input } from '../_internal/types'

export default interface SliderProps extends Input<any> {
  customValues?: string[]
  min?: number
  max?: number
  step?: number
  range?: boolean
  dots?: boolean
  indicators?: { color?: string; range: [number, number] }[]

  labelFormatter?: (label) => string
  labelRangeSeparator?: string
  labelSuffix?: string
}
