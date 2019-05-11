import * as React from 'react'

export default interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  as?: React.ComponentType<any> | string
  selected?: boolean
  rightElement?: React.ReactNode
}
