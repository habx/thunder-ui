import * as React from 'react'

export default interface MenuProps
  extends React.HTMLAttributes<HTMLUListElement> {
  triggerElement: React.ReactElement<any>
  position?: 'left' | 'right' | 'top-left' | 'top-right'
  persistent?: boolean
  portal?: boolean
}
