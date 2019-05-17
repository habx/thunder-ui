import styled from 'styled-components'

import zIndex from '../_internal/zIndex'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.highest - 1};
`
