import styled from 'styled-components'

import { colors, fontSizes } from '../../theme'

export const ArrayInputContainer = styled.div``

export const ItemContainer = styled.div`
  &:not(:first-child) {
    padding-top: 8px;
  }

  &:not(:last-child) {
    border-bottom: 2px solid ${colors.paynesGrey};
  }
`

export const ArrayInputAction = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
`

export const ItemHeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
  
  padding-bottom: 8px;

`

export const ItemContent = styled.div`
  padding-bottom: 8px;
`

export const ItemHeaderContent = styled.div`
  flex: 1 1 auto;
  padding-bottom: 8px;
`

export const ItemActions = styled.div`
  flex: 0 0 auto;
  padding-left: 32px;
  
  i {
    color: ${colors.paynesGrey};
    font-size: ${fontSizes.regular};
    cursor: pointer;
  }
`
