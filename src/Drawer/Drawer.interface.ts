import * as React from 'react'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
}

export default interface DrawerInterface {
  title?: string
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  closeButton?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  open: boolean
  onClose: (e: React.FormEvent<HTMLInputElement>) => void
  portal?: boolean
}
