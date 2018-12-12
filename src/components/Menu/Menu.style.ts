import styled from 'styled-components'

import { shadows, borderRadius, colors, fontSizes } from '../../theme'

const prepareProps = ({ position }) => ({
  left: position === 'left' ? '4px' : 'unset',
  right: position === 'right' ? '4px' : 'unset',
})

export const MenuContainer = styled.div.attrs(prepareProps)`
  position: absolute;
  top: calc(100% + 4px);
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
