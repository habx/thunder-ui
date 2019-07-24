import styled, { css } from 'styled-components'

import theme from '../theme'

export const SlideshowContainer = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`

export const SlideshowContent = styled.div<{
  transitionDuration: number
  length: number
}>`
  width: 100%;
  display: flex;
  transition: transform ease-in-out
    ${({ transitionDuration }) => transitionDuration}ms;
  transform: translateX(0);
  ${({ length }) => css`
    ${new Array(length)
      .fill(0)
      .map(
        (_, i) => `
      &[data-index="${i}"] {
        transform: translateX(-${i * 100}%);
      }
    `
      )
      .join('')}
  }`}
`

export const SlideshowElement = styled.div`
  width: 100%;
  flex: 0 0 100%;
  margin-bottom: auto;
  margin-top: auto;
`

export const NavigationDotsContainer = styled.div<{ canNavigate?: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 16px;

  &:hover {
    cursor: ${({ canNavigate }) => (canNavigate ? 'pointer' : 'auto')};
  }
`

export const Dot = styled.div`
  display: inline-block;
  margin: 0 1.5px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  vertical-align: middle;
  transition: width 300ms ease-in-out;

  &[data-active='true'] {
    width: 16px;
    background-color: ${theme.get('primary')};
  }
`
