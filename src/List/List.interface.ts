import * as React from 'react'

export default interface ListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  itemsAs?: React.ComponentType<any> | string
  hoverColor?: string
  clickable?: boolean
  selectable?: boolean
  children?: React.ReactElement<any>[]
}

export interface ListContextProps {
  as?: React.ComponentType<any> | string
  clickable?: boolean
  hoverColor?: string
}
