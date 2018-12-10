import DOMInterface from '../../internal/domInterface'

export default interface TextInputProps extends DOMInterface {
  onChange?: (value) => void,
  isLoading?: boolean,
  rightElement?: React.ReactNode,
  rightHoverElement?: React.ReactNode,
  activeBorderColor?: string,
  color?: string,
  borderColor?: string,
  error?: boolean,
  errorColor?: string,
}
