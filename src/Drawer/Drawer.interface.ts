import * as React from 'react'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
}

export default interface DrawerProps {
  title?: string
  open: boolean
  onClose: (e: React.FormEvent<HTMLInputElement>) => void
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  closeButton?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
}
