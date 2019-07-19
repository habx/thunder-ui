import styled from 'styled-components'

import theme from '../theme'
import zIndex from '../zIndex'

export const AutoCompleteInputContainer = styled.span``

export const Options = styled.div`
  position: fixed;
  z-index: ${zIndex.highest};
  pointer-events: none;

  box-shadow: ${theme.get('shadowLight')};
  opacity: 0;
  overflow: hidden;
  margin-top: -1px;

  background-color: ${theme.get('neutralLightest')};
  border-radius: 0 0 4px 4px;
  border-top: 1px solid ${theme.get('neutral', { dynamic: true })};
  max-height: 0;
  min-width: ${({ wrapperRect }) => `${wrapperRect.width}px`};
  top: ${({ wrapperRect }) => `${wrapperRect.top + wrapperRect.height}px`};
  left: ${({ wrapperRect }) => `${wrapperRect.left}px`};

  transition: max-height ease-in-out 300ms, opacity ease-in-out 300ms;

  &[data-open='true'] {
    max-height: 324px;
    opacity: 1;
    pointer-events: unset;
  }

  & * {
    user-select: none;
  }
`

export const OptionsContent = styled.ul`
  list-style-type: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0;
  max-height: ${({ noMaxHeight }) => (noMaxHeight ? 'unset' : '300px')};
`
