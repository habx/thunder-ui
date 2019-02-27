import styled from 'styled-components'

import shadows from '../../shadows'
import fontSizes from '../../fontSizes'
import { getMainColor } from '../../_internal/colors'
import Option from '../Option'
import colors from '../../colors'

export const OptionsContainer = styled.div`
  box-shadow: ${shadows.light};
  position: absolute;
  top: calc(100% - 1px);
  opacity: 0;
  overflow: hidden;

  background-color: #ffffff;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid ${props => getMainColor(props, { themeKey: 'neutral' })};
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
  max-height: ${({ noMaxHeight }) => noMaxHeight ? 'unset' : '300px'};
`

export const OptionsModalContent = styled.div``

export const EmptyOptions = styled.div`
  padding: 8px 18px;
`

export const Description = styled.div`
  padding: 0 18px 8px 18px;
  border-bottom: solid 1px ${props => getMainColor(props, { themeKey: 'neutral' })};
`

export const DescriptionAnnotation = styled.div`
  font-size: ${fontSizes.tiny};
  color: ${props => getMainColor(props, { themeKey: 'neutral' })};
`

export const SelectAllOption = styled(Option)`
  border-bottom: solid 1px ${colors.paynesGrey};
  font-weight: 600;
`
