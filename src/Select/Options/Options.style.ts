import styled from 'styled-components'

import shadows from '../../shadows'
import fontSizes from '../../fontSizes'
import zIndex from '../../_internal/zIndex'
import { getMainColor } from '../../_internal/colors'
import Option from '../Option'
import colors from '../../colors'

export const OptionsContainer = styled.div`
  position: fixed;
  z-index: ${zIndex.highest};

  box-shadow: ${shadows.light};
  opacity: 0;
  overflow: hidden;
  margin-top: -1px;

  background-color: #ffffff;
  /border-radius: 0 0 4px 4px;
  border-top: 1px solid ${props => getMainColor(props, { themeKey: 'neutral' })};
  max-height: 0;
  min-width: ${({ wrapperRect }) => `${wrapperRect.width}px`};
  top: ${({ wrapperRect }) => `${wrapperRect.top + wrapperRect.height}px`};
  left: ${({ wrapperRect }) => `${wrapperRect.left}px`};

  transition: max-height ease-in-out 300ms, opacity ease-in-out 300ms;

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
