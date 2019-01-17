import DOMInterface from '../internal/domInterface'

export default interface SliderProps extends DOMInterface {
  onChange?: (value) => void,
  value: number[] | number,
  range?: boolean,
  customValues?: string[],
  toolTipSuffix?: string,
  min?: number,
  max?: number,
  color?: string,
  step?: number,
  labelFormatter?: (label) => string,
}
