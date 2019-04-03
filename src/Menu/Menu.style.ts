import styled from 'styled-components'

import shadows from '../shadows'
import borderRadius from '../borderRadius'
import zIndex from '../_internal/zIndex'
import { getMainColor } from '../_internal/colors'

const prepareProps = ({ position, wrapperRect }) => ({
  left: ['left', 'top-left'].includes(position) ? `${wrapperRect.left + 4}px` : 'unset',
  right: ['right', 'top-right'].includes(position) ? `${wrapperRect.right - wrapperRect.width + 4}px` : 'unset',
  bottom: ['top-left', 'top-right'].includes(position) ? `${wrapperRect.bottom + 4}px` : 'unset',
  top: ['top-left', 'top-right'].includes(position) ? 'unset' : `calc(${wrapperRect.top + wrapperRect.height + 4}px)`
})

const preparePropsMobile = ({ position, wrapperRect }) => ({
  left: '0px',
  right: '0px',
  marginTop: ['left', 'right'].includes(position) ? '4px' : '0',
  transform: ['top-left', 'top-right'].includes(position) ? `translateY(0)` : `translateY(${wrapperRect.top + wrapperRect.height + 4}px)`
})

export const MenuContainerDesktop = styled.div.attrs(prepareProps)`
  position: absolute;
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  opacity: 0;
  z-index: ${zIndex.low};
  pointer-events: none;

  transition: opacity ease-in-out 150ms;

  &[data-open="true"] {
    pointer-events: auto;
    opacity: 1;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

export const MobileMenuContainer = styled.div.attrs(preparePropsMobile)`
  display: none;
  position: absolute;
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  margin-top: ${({ marginTop }) => marginTop};
  transform: ${({ transform }) => transform};
  opacity: 0;
  z-index: ${zIndex.low};
  pointer-events: none;

  transition: opacity ease-in-out 150ms;

  &[data-open="true"] {
    pointer-events: auto;
    opacity: 1;
  }

  @media (max-width: 600px) {
    display: block;
  }
`

export const MenuContent = styled.ul`
  box-shadow: ${shadows.light};
  border-radius: ${borderRadius.narrow};
  padding: 8px 0;
  background-color: ${props => getMainColor(props, { customizable: false, themeKey: 'neutralLightest' })};

  list-style-type: none;
`

export const MenuWrapper = styled.div`
  position: relative;

  @media (max-width: 600px) {
    position: static;
  }
`
