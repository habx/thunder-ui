import * as React from 'react'

export default interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  as?: React.ComponentType<any>
  selected?: boolean
  rightElement?: React.ReactNode
}
