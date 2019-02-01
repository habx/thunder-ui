import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface ItemProps extends DOMNode {
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
  focusOnRender?: boolean
}

export interface ItemInnerProps extends ItemProps {
  query: string
  selected: boolean
  registerActions: (actionName: string, actionCallback: (e: React.FormEvent<HTMLInputElement>) => void) => void
}
