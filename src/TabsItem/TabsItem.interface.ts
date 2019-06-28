import * as React from 'react'

export default interface TabsItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  activeColor?: string
  hoverColor?: string
  closed?: boolean
  active?: boolean
}
