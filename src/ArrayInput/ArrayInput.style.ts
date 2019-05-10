import styled from 'styled-components'

import fontSizes from '../fontSizes'
import theme from '../theme'

export const ArrayInputAction = styled.div`
  padding-top: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const ItemHeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex: 1 1 100%;
`

export const ItemHeaderContent = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.get('neutral', { dynamic: true })};
  font-size: ${fontSizes.small};
`

export const ItemActions = styled.div`
  flex: 0 0 auto;
  padding-left: 24px;
  user-select: none;
  display: flex;
  align-items: center;
  color: ${theme.get('neutral', { dynamic: true })};

  i {
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 8px;
    }

    &[data-disabled='true'] {
      color: ${theme.get('neutralLight', { dynamic: true })};
    }
  }
`
