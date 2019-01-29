import styled from 'styled-components'

import shadows from '../../shadows'
import colors from '../../colors'
import fontSizes from '../../fontSizes'

export const OptionsContainer = styled.div`
  box-shadow: ${shadows.light};
  position: absolute;
  top: calc(100% - 1px);
  opacity: 0;
  overflow: hidden;

  background-color: #ffffff;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid ${colors.paynesGrey};
  max-height: 0;
  min-width: 100%;
  z-index: 5;

  transition: all ease-in-out 300ms;

  &[data-open="true"] {
    max-height: 300px;
    opacity: 1;
  }

  & * {
    user-select: none;
  }
`

export const OptionsContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0;
  max-height: 300px;
`

export const EmptyOptions = styled.div`
  padding: 8px 18px;
`

export const Description = styled.div`
  padding: 0 18px 8px 18px;
  border-bottom: solid 1px ${colors.paynesGrey};
`

export const DescriptionAnnotation = styled.div`
  font-size: ${fontSizes.tiny};
  color: ${colors.paynesGrey};
`
