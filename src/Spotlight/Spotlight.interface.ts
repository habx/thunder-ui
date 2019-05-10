import * as React from 'react'

import { DOMNode } from '../_internal/types'

import { ItemRegistrationData } from './SpotlightContent/SpotlightContent.interface'

type themeType = {
  background?: string
  border?: string
  text?: string

  section?: {
    title?: string
  }

  item?: {
    title?: string
    subtitle?: string
    focus?: string
    actionIcon?: string
    icon?: React.ReactNode
    iconBackground?: string
    highlight?: string
    subtitleFont?: string
  }

  welcome?: {
    background?: string
    color?: string
  }
}

export default interface SpotlightProps extends DOMNode {
  query?: string
  data?: Array<any> | object
  open?: boolean
  onClose?: () => void
  onQueryChange?: (query: string) => void
  placeholder?: string
  theme?: themeType
}

export interface SpotlightContextProps {
  query: string
  data: Array<any> | object
  selectedItemKey: number
  registerItem: (sectionName: string, item: ItemRegistrationData) => void
  unRegisterItem: (sectionName: string, itemKey: number) => void
}
