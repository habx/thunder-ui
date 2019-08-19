import * as React from 'react'

import theme from '../theme'

import IconButtonProps from './IconButton.interface'
import { IconButtonContainer } from './IconButton.style'

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { small, large, ...rest } = props

    const color = theme.get('primary', { dynamic: true })(props)
    const hoverColor = theme.getActive(props.hoverColor, color)

    return (
      <IconButtonContainer
        data-small={small}
        data-large={large}
        {...rest}
        color={color}
        hoverColor={hoverColor}
        ref={ref}
      />
    )
  }
)

IconButton.defaultProps = {
  type: 'button',
}

export default IconButton
