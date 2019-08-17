import { Modal } from '@delangle/use-modal'
import * as React from 'react'

export default interface DrawerInterface
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children?: React.ReactNode | ((modal: Modal) => JSX.Element)
  closeButton?: React.ReactNode | ((modal: Modal) => JSX.Element)
  onClose?: () => void
  open?: boolean
  portal?: boolean
  contentContainerComponent?: React.ComponentType
  position?: 'right' | 'left' | 'top' | 'bottom'
  alwaysRenderChildren?: boolean
}
