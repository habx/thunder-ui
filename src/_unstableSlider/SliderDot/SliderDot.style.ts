import styled from 'styled-components'

import theme from '../../theme'

export const SliderDotContainer = styled.div`
  position: absolute;
  margin-left: -8px;
  margin-top: -6px;
  z-index: 6;
  cursor: grab;
  width: 16px;
  height: 16px;
  box-shadow: ${theme.get('shadowLight')};
  touch-action: pan-x;
  border-radius: 50%;
`

export const SliderInnerDot = styled.div`
  margin: 25% auto auto;
  height: 50%;
  width: 50%;
  border-radius: 100%;
`
