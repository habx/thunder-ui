import * as React from 'react'

import { Except } from '../_internal/types'
import { SpotlightContextProps } from '../Spotlight/Spotlight.interface'
import { SpotlightSectionContextProps } from '../SpotlightSection/SpotlightSection.interface'

export interface ItemInjectedProps {
  query: string
  selected: boolean
  registerActions: (
    actionName: string,
    actionCallback: (e: React.FormEvent<HTMLInputElement>) => void
  ) => void
}

type actionSpotlightState = {
  spotlight: SpotlightContextProps
  section: SpotlightSectionContextProps
}

export interface ItemActions {
  onSubmit?: (e: React.UIEvent<HTMLInputElement>) => void
  onBlur?: (e: React.UIEvent<HTMLInputElement>) => void
  onFocus?: (e: React.UIEvent<HTMLInputElement>) => void
  onClick?: (e: React.UIEvent<HTMLInputElement>) => void
}

export interface ItemReceivedProps {
  index: number
  onSubmit?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
  onBlur?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
  onFocus?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
  onClick?: (
    e: React.UIEvent<HTMLInputElement>,
    state: actionSpotlightState
  ) => void
}

export type WithItemBehaviorProps<ComponentProps> = Except<
  Except<ComponentProps, keyof ItemInjectedProps>,
  keyof ItemActions
> &
  ItemReceivedProps

export interface ItemInnerProps extends React.LiHTMLAttributes<HTMLLIElement> {
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

export default interface ItemProps
  extends WithItemBehaviorProps<ItemInnerProps> {}
