import styled from 'styled-components'

import zIndex from '../../_internal/zIndex'
import fontSizes from '../../fontSizes'
import theme from '../../theme'
import Option from '../Option'

export const MAX_HEIGHT = 300

export const OptionsContainer = styled.div<{
  wrapperRect: DOMRect
  maxHeight?: number
}>`
  position: fixed;
  z-index: ${zIndex.highest};
  pointer-events: none;

  box-shadow: ${theme.get('shadowLight')};
  opacity: 0;
  overflow: hidden;
  margin-top: -1px;

  background-color: ${theme.get('neutralLightest')};
  max-height: 0;
  min-width: ${({ wrapperRect }) => `${wrapperRect.width}px`};
  left: ${({ wrapperRect }) => `${wrapperRect.left}px`};

  transition: max-height ease-in-out 300ms, opacity ease-in-out 300ms;

  &[data-open='true'] {
    max-height: ${({ maxHeight }) => (maxHeight || MAX_HEIGHT) + 24}px;
    opacity: 1;
    pointer-events: unset;
  }
  &[data-position='bottom'] {
    top: ${({ wrapperRect }) => `${wrapperRect.bottom}px`};
    border-top: 1px solid ${theme.get('neutral', { dynamic: true })};
    border-radius: 0 0 4px 4px;
  }
  &[data-position='top'] {
    border-radius: 4px 4px 0 0;
    bottom: ${({ wrapperRect }) => `${window.innerHeight - wrapperRect.top}px`};
    border-bottom: 1px solid ${theme.get('neutral', { dynamic: true })};
  }

  & * {
    user-select: none;
  }
`

export const OptionsContent = styled.ul<{
  noMaxHeight?: boolean
  maxHeight?: number
}>`
  list-style-type: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0;
  max-height: ${({ noMaxHeight, maxHeight }) =>
    noMaxHeight
      ? 'unset'
      : `${maxHeight < MAX_HEIGHT ? maxHeight : MAX_HEIGHT}px`};
`

export const OptionsModalContent = styled.div``

export const EmptyOptions = styled.div`
  padding: 8px 18px;
`

export const Description = styled.li`
  padding: 0 18px 8px 18px;
  border-bottom: solid 1px ${theme.get('neutral', { dynamic: true })};
`

export const DescriptionAnnotation = styled.div`
  font-size: ${fontSizes.tiny};
  color: ${theme.get('neutral', { dynamic: true })};
`

export const SelectAllOption = styled(Option)`
  border-bottom: solid 1px ${theme.get('neutral')};
  font-weight: 600;
`
