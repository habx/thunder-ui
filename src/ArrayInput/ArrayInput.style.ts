import styled, { keyframes, css } from 'styled-components'

import colors from '../colors'
import fontSizes from '../fontSizes'

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
    border-bottom: 1px solid ${colors.paynesGrey};
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
  color: ${colors.paynesGrey};
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
      color: ${colors.paynesGrey};
    }
  }
`

export const ItemDescription = styled.div`
  font-size: ${fontSizes.small};
  color: ${colors.paynesGrey};
`
