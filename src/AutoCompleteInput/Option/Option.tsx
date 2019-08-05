import * as React from 'react'

import OptionProps from './Option.interface'
import { OptionContainer } from './Option.style'

const Option: React.FunctionComponent<OptionProps> = ({
  label,
  focused,
  ...props
}) => {
  const ref = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus()
    }
  }, [focused])

  return (
    <OptionContainer
      data-testid="option-container"
      ref={ref}
      tabIndex={0}
      {...props}
    >
      {label}
    </OptionContainer>
  )
}

export default Option
