import DOMInterface from '../../internal/domInterface'

export default interface RadioSelectProps extends DOMInterface {
  options: formOptionInterface[],
  onChange: (value) => void,
  canBeEmpty?: boolean,
  isMulti?: boolean,
  disabled?: boolean,
  value: formValue | formValue[],
  color?: string,
}
