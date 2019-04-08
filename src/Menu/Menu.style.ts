import styled from 'styled-components'

import borderRadius from '../borderRadius'
import zIndex from '../_internal/zIndex'
import theme from '../theme'
import { getMainColor } from '../_internal/colors'

const prepareProps = ({ position, wrapperRect }) => ({
  left: ['left', 'top-left'].includes(position) ? `${wrapperRect.left + 4}px` : 'unset',
  right: ['right', 'top-right'].includes(position) ? `calc(100% - ${wrapperRect.right + 4}px)` : 'unset',
  bottom: ['top-left', 'top-right'].includes(position) ? `calc(100% - ${wrapperRect.top + 4}px)` : 'unset',
  top: ['top-left', 'top-right'].includes(position) ? 'unset' : `calc(${wrapperRect.top}px + ${ wrapperRect.height + 4}px)`
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
  z-index: ${zIndex.highest};

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

  z-index: ${zIndex.highest};

  &[data-open="true"] {
    pointer-events: auto;
    opacity: 1;
    display: block;
  }

  @media (max-width: 600px) {
    display: block;
  }
`

export const MenuContent = styled.ul`
  box-shadow: ${theme.get('shadowLight')};
  border-radius: ${borderRadius.narrow};
  padding: 8px 0;
  background-color: ${props => getMainColor(props, { customizable: false, themeKey: 'neutralLightest' })};
  margin: 8px 0 0 0;

  list-style-type: none;
`

export const MenuWrapper = styled.div`
  position: relative;

  @media (max-width: 600px) {
    position: static;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.highest - 1};
  overflow: hidden;
`
