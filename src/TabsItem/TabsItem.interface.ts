import * as React from 'react'

export default interface TabsItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  activeColor?: string
  hoverColor?: string
  closed?: boolean
  active?: boolean
}
