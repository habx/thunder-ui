import * as React from 'react'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
  close: (e?: Event) => void
}

export default interface DrawerInterface {
  title?: string
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  closeButton?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
  open?: boolean
  portal?: boolean
  contentContainerComponent?: React.ComponentType
  position?: 'right' | 'left' | 'top' | 'bottom'
}
