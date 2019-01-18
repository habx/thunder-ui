import * as React from 'react'

export default interface DomInterface {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
  className?: string
}
