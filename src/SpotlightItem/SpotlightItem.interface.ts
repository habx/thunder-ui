import * as React from 'react'

export default interface ItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  index: number
  title: string
  subtitle?: string
  href?: string
  target?: string
  icon?: React.ReactNode
  iconStyle?: React.CSSProperties
  as?: React.ComponentType<any> | string
  refPropName?: string
  onDelete?: () => void
  onEdit?: (value: any) => void
  focusOnMount?: boolean
  query: string
  selected: boolean
  registerActions: (
    actionName: string,
    actionCallback: (e: React.FormEvent<HTMLInputElement>) => void
  ) => void
}
