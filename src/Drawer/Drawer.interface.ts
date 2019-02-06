import * as React from 'react'
import { OpenableProps } from '../_internal/types'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
}

export interface DrawerSpecificProps {
  title?: string
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  closeButton?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
}

export default interface DrawerInterface extends DrawerSpecificProps, OpenableProps {
}
