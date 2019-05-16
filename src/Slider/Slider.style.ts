import styled from 'styled-components'

import theme from '../theme'

import { SliderBarContainer } from './SliderBar/SliderBar.style'
import { SliderDotContainer } from './SliderDot/SliderDot.style'

export const SliderContainer = styled.div`
  padding: 8px 8px 30px 8px;
`

export const SliderTooltip = styled.div`
  position: absolute;
  top: 16px;
  margin-left: -4px;
`

export const SliderContent = styled.div`
  position: relative;
  padding: 8px 0;
  cursor: pointer;

  & ${SliderDotContainer}, & ${SliderBarContainer} {
    background-color: ${theme.get('primary', { dynamic: true })};
  }

  & ${SliderTooltip} {
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
