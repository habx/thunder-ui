import * as React from 'react'

import DOMInterface from '../../../internal/domInterface'

export default interface ItemProps extends DOMInterface {
  index: number
  title: string
  subtitle?: string
  icon?: React.ReactNode
  iconStyle?: React.CSSProperties
  as?: React.ComponentClass<any> | React.StatelessComponent<any> | string
  refPropName?: string
  onDelete: () => void
  onEdit: (value: any) => void
  focusOnRender?: boolean
  href?: string
}

export interface ItemInnerProps extends ItemProps {
  query: string
  selected: boolean
  registerActions: (actionName: string, actionCallback: (e: React.FormEvent<HTMLInputElement>) => void) => void
}
