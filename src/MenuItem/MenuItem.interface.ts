import * as React from 'react'

export default interface MenuItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
  disabled?: boolean
}
