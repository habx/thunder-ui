import * as React from 'react'

export default interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  bold?: boolean
  colorSeed?: string
  color?: string
}
