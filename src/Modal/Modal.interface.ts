import * as React from 'react'

import CardProps from '../Card/Card.interface'
import { OpenableProps } from '../_internal/types'

interface InjectedRenderProps {
  state: 'opened' | 'closed' | 'opening' | 'closing'
}

export interface ModalSpecificProps extends CardProps {
  headerPosition?: never
  children?: React.ReactNode | ((props: InjectedRenderProps) => JSX.Element)
  persistent?: boolean
  closeButton?: JSX.Element
}

export default interface ModalProps extends ModalSpecificProps, OpenableProps {
}
