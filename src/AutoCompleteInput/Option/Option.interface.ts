import * as React from 'react'

export default interface OptionProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  focused: boolean
  label: string
}
