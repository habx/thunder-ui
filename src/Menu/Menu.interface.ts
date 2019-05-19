import * as React from 'react'

export interface MenuState {
  open: boolean
}

export default interface MenuProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode | ((props: MenuState) => JSX.Element)
  triggerElement: React.ReactElement<any>
  position?: 'left' | 'right' | 'top-left' | 'top-right'
  persistent?: boolean
  portal?: boolean
}
