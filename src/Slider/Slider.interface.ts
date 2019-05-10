import { Input } from '../_internal/types'

export default interface SliderProps extends Input<any> {
  customValues?: string[]
  toolTipSuffix?: string
  min?: number
  max?: number
  step?: number
  labelFormatter?: (label) => string
  range?: boolean
  dots?: boolean
  indicators?: { color?: string; range: [number, number] }[]
}
