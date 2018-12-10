import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../../theme'
import SpinnerProps from './Spinner.interface'

const SpinnerContainer = styled.div`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const Spinner = styled.svg`
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

const LibSpinner: React.StatelessComponent<SpinnerProps> = ({ color, size = 50, ...props }) => (
  <SpinnerContainer {...props} size={size}>
    <Spinner viewBox={`0 0 ${size} ${size}`} size={size}>
      <circle className='path' cx={size / 2} cy={size / 2} r={(size / 2) - (size / 10)} fill='none' strokeWidth='3' stroke={color || colors.trueBlue} />
    </Spinner>
  </SpinnerContainer>
)

export default LibSpinner
