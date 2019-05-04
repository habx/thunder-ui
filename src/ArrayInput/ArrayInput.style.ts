import styled, { css } from 'styled-components'

import fontSizes from '../fontSizes'
import { getMainColor } from '../_internal/colors'

export const ArrayInputContainer = styled.div`
  ${({ disabled }) => disabled && css`
    pointer-events: none;
    opacity: 0.8;
    filter: grayscale();
  `};
`

export const ItemContainer = styled.div`
  &:not(:first-child) {
    padding-top: 8px;
  }

  &:not(:last-child) {
    padding-bottom: 8px;
    border-bottom: 1px solid ${props => getMainColor(props, { themeKey: 'neutral' })};
  }
`

export const ArrayInputAction = styled.div`
  padding-top: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const ItemHeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
`

export const ItemContent = styled.div`
  padding-top: 16px;
  padding-left: 8px;
`

export const ItemHeaderContent = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => getMainColor(props, { themeKey: 'neutral' })};
  font-size: ${fontSizes.small};
`

export const ItemActions = styled.div`
  flex: 0 0 auto;
  padding-left: 32px;
  user-select: none;

  i {
    font-size: ${fontSizes.large};
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 4px;
    }

    &[data-disabled="true"] {
      pointer-events: none;
      color: ${props => getMainColor(props, { themeKey: 'neutral' })};
    }
  }
`

export const ItemDescription = styled.div`
  font-size: ${fontSizes.small};
  color: ${props => getMainColor(props, { themeKey: 'neutral' })};
`
