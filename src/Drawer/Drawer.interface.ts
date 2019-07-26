import * as React from 'react'

import { ModalState } from '../_internal/useModal'

export default interface DrawerInterface
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children?: React.ReactNode | ((props: ModalState) => JSX.Element)
  closeButton?: React.ReactNode | ((props: ModalState) => JSX.Element)
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
  open?: boolean
  portal?: boolean
  contentContainerComponent?: React.ComponentType
  position?: 'right' | 'left' | 'top' | 'bottom'
  alwaysRenderChildren?: boolean
}
