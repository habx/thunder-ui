import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import { getMainColor } from '../_internal/colors'

import SpinnerProps from './Spinner.interface'

const SpinnerContainer = styled.div`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const SpinnerElement = styled.svg`
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: ${({ size }) => `-${size / 2}px 0 0 -${size / 2}px;`};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  circle {
    stroke-linecap: round;
    stroke-dasharray: ${({ size }) => size * 2}, ${({ size }) => size * 3};
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, ${({ size }) => size * 3};
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: ${({ size }) => size * 2}, ${({ size }) => size * 3};
      stroke-dashoffset: -${({ size }) => size * 0.5};
    }
    100% {
      stroke-dasharray: ${({ size }) => size * 2}, ${({ size }) => size * 3};
      stroke-dashoffset: -${({ size }) => size * 2.5};
    }
  }
`

const Spinner: React.StatelessComponent<SpinnerProps> = ({ size = 50, ...props }) => {
  const color = getMainColor(props, { themeKey: 'primary' })

  return (
    <SpinnerContainer {...props} size={size}>
      <SpinnerElement viewBox={`0 0 ${size} ${size}`} size={size}>
        <circle className='path' cx={size / 2} cy={size / 2} r={(size / 2) - (size / 10)} fill='none' strokeWidth={size / 15} stroke={color} />
      </SpinnerElement>
    </SpinnerContainer>
  )
}

export default withTheme(Spinner)
