import * as React from 'react'
import styled, { withTheme } from 'styled-components'

import theme from '../theme'

import SpinnerProps, { SpinnerInnerProps } from './Spinner.interface'

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const SpinnerElementContainer = styled.div`
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

const Spinner: React.FunctionComponent<SpinnerInnerProps> = ({
  size = 50,
  ...props
}) => (
  <SpinnerContainer {...props}>
    <SpinnerElementContainer size={size}>
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

export default withTheme(Spinner) as React.FunctionComponent<SpinnerProps>
