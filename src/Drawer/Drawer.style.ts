import styled from 'styled-components'

import zIndex from '../_internal/zIndex'
import Title from '../Title'

export const ANIMATION_DURATION = 200

const prepareProps = ({ position }) => {
  let transformBefore = ''
  let transformAfter = ''
  switch (position) {
    case 'right':
      transformBefore = 'translateX(100%)'
      transformAfter = 'translateX(0)'
      break
    case 'left':
      transformBefore = 'translateX(-100%)'
      transformAfter = 'translateX(0)'
      break
    case 'top':
      transformBefore = 'translateY(-100%)'
      transformAfter = 'translateY(0)'
      break
    case 'bottom':
      transformBefore = 'translateY(100%)'
      transformAfter = 'translateY(0)'
      break
    default:
      break
  }
  return {
    left: position !== 'right' ? 0 : 'unset',
    right: position !== 'left' ? 0 : 'unset',
    bottom: position === 'top' ? 'unset' : 0,
    top: position === 'bottom' ? 'unset' : 0,
    height: ['right', 'left'].includes(position) ? '100vh' : 'auto',
    width: ['bottom', 'top'].includes(position) ? '100vw' : 'auto',
    transformBefore,
    transformAfter,
  }
}

export const DrawerContainer = styled.div.attrs(prepareProps)`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: fixed;
  display: flex;
  flex-direction: column;

  bottom: ${({ bottom }) => bottom};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  left: ${({ left }) => left};

  height: ${({ height }) => height};
  width: ${({ width }) => width};
  max-width: calc(100vw - 42px);
  max-height: 100vh;

  background: white;
  overflow: hidden;

  transition: transform ${ANIMATION_DURATION}ms ease-in-out;
  transform: ${({ transformBefore }) => transformBefore};

  &[data-state='opened'] {
    transform: ${({ transformAfter }) => transformAfter};
  }
`

export const DrawerTitle = styled(Title)`
  display: flex;
  padding: 32px 64px 16px;
  border-bottom: solid #efefef 1px;
  @media screen and (max-width: 992px) {
    padding: 32px;
  }
`

export const DrawerClose = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;

  @media screen and (max-width: 992px) {
    left: 4px;
  }

  transition: all ease-in-out 200ms;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const DrawerContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 16px 64px;
  @media screen and (max-width: 992px) {
    padding: 32px;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: ${zIndex.high};

  opacity: 0;

  transition: opacity ease-in-out ${ANIMATION_DURATION}ms;
  pointer-events: none;

  &[data-state='opened'] {
    opacity: 1;
    pointer-events: auto;
  }
`
