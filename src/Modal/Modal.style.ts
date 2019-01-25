import styled, { createGlobalStyle, css } from 'styled-components'

import { FADE_IN } from '../_internal/animations'
import Card from '../Card'

export const ANIMATION_DURATION = 300

export const ModalCard = styled(Card)`
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  position: relative;

  max-width: 800px;
  max-height: calc(100vh - 64px);
  overflow-x: hidden;
  overflow-y: auto;

  transform: translateY(32px);
  transition: transform ${ANIMATION_DURATION}ms ease-in-out;
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
  z-index: 99999;

  &[data-state="opening"] {
    animation: ${FADE_IN} ${ANIMATION_DURATION}ms linear 0ms;
  }

  &[data-state="closing"] {
    animation: ${FADE_IN} ${ANIMATION_DURATION}ms linear 0ms reverse;
    opacity: 0;
    pointer-events: none;
  }

  &[data-state="closed"] {
    pacity: 0;
    pointer-events: none;o
  }

  &[data-state="closing"],
  &[data-state="closed"] {
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
