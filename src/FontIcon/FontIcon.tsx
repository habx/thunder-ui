import * as React from 'react'

import FontIconProps from './FontIcon.interface'
import { FontIconContainer } from './FontIcon.style'

const FontIcon = React.forwardRef<HTMLElement, FontIconProps>((props, ref) => {
  const { icon, ...rest } = props

  return (
    <FontIconContainer {...rest} ref={ref}>
      {icon}
    </FontIconContainer>
  )
})

FontIcon.defaultProps = {
  size: 24,
}

export default FontIcon
