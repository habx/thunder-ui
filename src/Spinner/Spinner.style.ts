import styled from 'styled-components'

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const SpinnerElementContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

export const SpinnerElement = styled.svg<{ size: number }>`
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
