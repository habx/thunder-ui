import * as React from 'react'

import FontIconProps from './FontIcon.interface'
import { FontIconContainer } from './FontIcon.style'

const FontIcon: React.StatelessComponent<FontIconProps> = ({ icon, ...props }) =>
  <FontIconContainer {...props}>{icon}</FontIconContainer>

FontIcon.defaultProps = {
  size: 24
}

export default FontIcon
