import styled, { createGlobalStyle } from 'styled-components'

import { FADE_IN } from '../_internal/animations'
import zIndex from '../_internal/zIndex'
import Card from '../Card'
import theme from '../theme'

export const ANIMATION_DURATION = 300

export const ModalCard = styled(Card)`
  box-shadow: ${theme.get('shadowStrong')};
  position: relative;

  max-width: 800px;
  max-height: calc(100vh - 64px);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateY(32px);
  box-sizing: border-box;

  &[data-animated='true'] {
    transition: transform ${ANIMATION_DURATION}ms ease-in-out;
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

  &[data-animated='true'] {
    &[data-state='opening'] {
      animation: ${FADE_IN} ${ANIMATION_DURATION}ms linear 0ms;
    }
  }

  &[data-state='closing'] {
    animation: ${FADE_IN} ${ANIMATION_DURATION}ms linear 0ms reverse;
    opacity: 0;
    pointer-events: none;
  }

  &[data-state='closed'] {
    opacity: 0;
    pointer-events: none;
  }

  &[data-state='closing'],
  &[data-state='closed'] {
    ${ModalCard} {
      transform: translateY(0px);
    }
  }
`

export const RemoveBodyScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

export const CloseButtonContainer = styled.div<{ hasTitle?: boolean }>`
  position: absolute;
  top: ${({ hasTitle }) => (hasTitle ? '32px' : '16px')};
  right: ${({ hasTitle }) => (hasTitle ? '32px' : '16px')};
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`
