import * as React from 'react'

export default interface SlideShowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onNavigationClick?: (index: number) => void
  isNavigationVisible?: boolean
  active: number
  color?: string
  transitionDuration?: number
}

export interface NavigationProps {
  canNavigate: boolean
  color?: string
  length: number
  active: number
  onClick?: (index: number) => void
}
