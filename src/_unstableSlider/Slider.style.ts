import styled from 'styled-components'

import theme from '../theme'

export const SliderBar = styled.div`
  background-color: ${theme.get('neutralStrong')};
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 2px;
`

export const SliderContainer = styled.div`
  position: relative;
`
