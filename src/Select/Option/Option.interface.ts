import * as React from 'react'

export default interface OptionProps
  extends React.HTMLAttributes<HTMLLIElement> {
  focused: boolean
  multi: boolean
  compact: boolean
  label: string
  selected: boolean
  disabled: boolean
}
