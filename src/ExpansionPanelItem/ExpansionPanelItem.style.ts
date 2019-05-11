import styled from 'styled-components'

import theme from '../theme'

export const ExpansionPanelItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.get('neutralLight')};
  }
`

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
  line-height: 1.3;
  padding: 8px 16px;
  cursor: pointer;
  user-select: none;
`

export const ExpansionPanelItemContent = styled.div`
  transition: max-height 300ms ease-in-out;
  overflow: hidden;

  &[data-open='false'] {
    max-height: 0;
  }

  &[data-open='true'] {
    max-height: ${({ height }) => height}px;
  }
`

export const CoreContent = styled.div`
  padding: 8px 16px 16px 16px;
`
