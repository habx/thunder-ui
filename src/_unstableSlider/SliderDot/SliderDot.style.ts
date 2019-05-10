import styled from 'styled-components'

import theme from '../../theme'

export const SliderDotContainer = styled.div`
  position: absolute;
  margin-left: -7px;
  margin-top: -5px;
  z-index: 5;
  cursor: grab;
  width: 16px;
  height: 16px;
  background-color: rgb(0, 113, 206);
  box-shadow: ${theme.get('shadowLight')};
  touch-action: pan-x;
  border-radius: 50%;
`
