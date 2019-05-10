import styled from 'styled-components'

import theme from '../../theme'

export const SliderDotContainer = styled.div`
  position: absolute;
  margin-left: -8px;
  margin-top: -6px;
  z-index: 5;
  cursor: grab;
  width: 16px;
  height: 16px;
  box-shadow: ${theme.get('shadowLight')};
  touch-action: pan-x;
  border-radius: 50%;
`
