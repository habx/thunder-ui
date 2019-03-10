import * as React from 'react'

import CardProps from '../Card/Card.interface'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
  close: (e?: Event) => void
}

export default interface ModalProps extends CardProps {
  headerPosition?: never
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  persistent?: boolean
  closeButton?: JSX.Element
  open: boolean
  onClose: (e: React.FormEvent<HTMLInputElement>) => void
  animated?: boolean
  portal?: boolean
}
