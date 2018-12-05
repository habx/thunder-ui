import styled from 'styled-components'

import { colors, fontSizes } from '../../theme'

export const ArrayInputContainer = styled.div``

export const ItemContainer = styled.div`
  &:not(:first-child) {
    padding-top: 8px;
  }

  &:not(:last-child) {
    padding-bottom: 8px;
    border-bottom: 2px solid ${colors.paynesGrey};
  }
`

export const ArrayInputAction = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const ItemHeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
`

export const ItemContent = styled.div`
  padding-top: 8px;
`

export const ItemHeaderContent = styled.div`
  flex: 1 1 auto;
`

export const ItemActions = styled.div`
  flex: 0 0 auto;
  padding-left: 32px;
  user-select: none;
  
  i {
    color: ${colors.maastrichtBlue};
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
