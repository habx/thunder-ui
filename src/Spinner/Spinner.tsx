import * as React from 'react'

import { styledTheme } from '../_internal/types'
import theme from '../theme'
import useTheme from '../useTheme'

import SpinnerProps from './Spinner.interface'
import {
  SpinnerContainer,
  SpinnerElementContainer,
  SpinnerElement,
} from './Spinner.style'

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (baseProps, ref) => {
    const thunderUi = useTheme()
    const fullTheme = { thunderUi } as styledTheme

    const props = { ...baseProps, theme: fullTheme }

    const { size = 50, ...rest } = props

    return (
      <SpinnerContainer>
        <SpinnerElementContainer size={size} {...rest} ref={ref}>
          <SpinnerElement viewBox={`0 0 ${size} ${size}`} size={size}>
            <circle
              className="path"
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - size / 10}
              fill="none"
              strokeWidth={size / 15}
              stroke={theme.get('primary')(props)}
            />
          </SpinnerElement>
        </SpinnerElementContainer>
      </SpinnerContainer>
    )
  }
)

export default Spinner
