import * as React from 'react'

export default interface NavBarItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  backgroundColor?: string
  activeBackgroundColor?: string
  icon?: React.ReactNode
  tooltip?: React.ReactNode
  active?: boolean
}
