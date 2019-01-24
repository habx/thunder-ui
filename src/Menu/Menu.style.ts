import styled from 'styled-components'

import shadows from '../shadows'
import borderRadius from '../borderRadius'

const prepareProps = ({ position }) => ({
  left: ['left', 'top-left'].includes(position) ? '4px' : 'unset',
  right: ['right', 'top-right'].includes(position) ? '4px' : 'unset',
  bottom: ['top-left', 'top-right'].includes(position) ? 'calc(100% + 4px)' : 'unset',
  top: ['top-left', 'top-right'].includes(position) ? 'unset' : 'calc(100% + 4px)'
})

export const MenuContainer = styled.div.attrs(prepareProps)`
  position: absolute;
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  opacity: 0;
  z-index: 100;
  pointer-events: none;
  background-color: white;

  transition: opacity ease-in-out 150ms;

  &[data-open="true"] {
    pointer-events: auto;
    opacity: 1;
  }
`

export const MenuContent = styled.ul`
  box-shadow: ${shadows.light};
  border-radius: ${borderRadius.narrow};
  padding: 8px 0;

  list-style-type: none;
`

export const MenuWrapper = styled.div`
  position: relative;
`
