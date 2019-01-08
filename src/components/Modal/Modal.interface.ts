import * as React from 'react'

import CardProps from '../Card/Card.interface'

export default interface ModalProps extends CardProps {
  open: boolean
  onClose: (e: React.FormEvent<HTMLInputElement>) => void
  headerPosition?: never
}
