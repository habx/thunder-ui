import styled from 'styled-components'

import theme from '../theme'

import { SliderBarContainer } from './SliderBar/SliderBar.style'
import { SliderDotContainer } from './SliderDot/SliderDot.style'

export const SliderContainer = styled.div`
  padding: 8px 8px 38px 8px;
`

export const SliderLabel = styled.div`
  position: absolute;
  top: 16px;
  margin-left: -4px;
`

export const SliderContent = styled.div`
  position: relative;
  & ${SliderDotContainer}, & ${SliderBarContainer} {
    background-color: ${theme.get('primary', { dynamic: true })};
  }

  & ${SliderLabel} {
    color: ${theme.get('primary', { dynamic: true })};
  }

  &[data-disabled='true'] {
    opacity: 0.7;
    pointer-events: none;
    filter: grayscale();
  }
`

export const SliderMainBar = styled.div`
  background-color: ${theme.get('neutralStrong')};
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 2px;
`

export const SliderBackgroundDot = styled.div`
  position: absolute;
  margin-left: -4px;
  margin-top: -2px;
  z-index: 3;
  cursor: grab;
  width: 8px;
  height: 8px;
  background-color: ${theme.get('neutralStrong')};
  box-shadow: ${theme.get('shadowLight')};
  touch-action: pan-x;
  border-radius: 50%;
`

export const SliderIndicator = styled.div`
  position: absolute;

  background-color: ${theme.get('warning')};
  height: 4px;
  top: 0;
  border-radius: 8px;
  z-index: 4;
`

export const SliderHandlerIndicator = styled.div`
  margin: 25% auto auto;
  height: 50%;
  width: 50%;
  border-radius: 100%;
`
