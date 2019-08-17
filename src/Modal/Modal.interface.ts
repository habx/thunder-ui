import { Modal as ModalType } from '@delangle/use-modal'
import * as React from 'react'

import CardProps from '../Card/Card.interface'

export default interface ModalProps extends CardProps {
  headerPosition?: never
  children?: React.ReactNode | ((modal: ModalType) => JSX.Element)
  persistent?: boolean
  closeButton?: JSX.Element
  open?: boolean
  onClose?: () => void
  animated?: boolean
  portal?: boolean
  alwaysRenderChildren?: boolean
}
