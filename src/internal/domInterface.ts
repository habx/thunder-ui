import * as React from 'react'

export default interface DomInterface {
  children?: React.ReactNode
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
}
