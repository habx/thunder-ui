import * as React from 'react'

export default interface MenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
  disabled?: boolean
}
