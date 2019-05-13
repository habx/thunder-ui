import * as React from 'react'

export default interface TabsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  hoverColor?: string
  activeColor?: string
  color?: string
}

export interface TabsContextProps {
  isInsideATabs: boolean
  hoverColor?: string
  activeColor?: string
  color?: string
}
