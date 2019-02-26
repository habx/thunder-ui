import { DOMNode } from '../_internal/types'

export default interface NavBarProps extends DOMNode {
  backgroundColor?: string
  activeBackgroundColor?: string
  title?: string
  defaultMobileIsOpen?: boolean
}

export interface NavBarState {
  mobileIsOpen: boolean
}
