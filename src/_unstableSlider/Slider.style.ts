import styled from 'styled-components'

import theme from '../theme'

export const SliderContent = styled.div`
  background-color: ${theme.get('neutralStrong')};
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 2px;
`

export const SliderContainer = styled.div`
  position: relative;
`

export const SliderLabel = styled.div`
  position: absolute;
  top: 16px;
  margin-left: -4px;
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
