import * as React from 'react'

import CardProps from '../Card/Card.interface'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
}

export default interface ModalProps extends CardProps {
  open: boolean
  onClose: (e: React.FormEvent<HTMLInputElement>) => void
  onOpen?: () => void
  headerPosition?: never
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
}
