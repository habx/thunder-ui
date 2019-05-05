import * as React from 'react'

import { ModalState } from '../_internal/useModal'
import CardProps from '../Card/Card.interface'

export default interface ModalProps extends CardProps {
  headerPosition?: never
  children?: React.ReactNode | ((props: ModalState) => JSX.Element)
  persistent?: boolean
  closeButton?: JSX.Element
  open?: boolean
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
  animated?: boolean
  portal?: boolean
}
