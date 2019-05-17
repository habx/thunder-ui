import * as React from 'react'

export default interface OptionProps
  extends React.HTMLAttributes<HTMLLIElement> {
  focused: boolean
  label: string
}
